import os
import time
import datetime
from pytz import timezone

from kaggle import KaggleApi

from backend import settings
from kagoole.models import Competition, Solution
from kagoole.util import post_twitter


def new_kaggle_api():
    api = KaggleApi()
    api.authenticate()

    return api


# create new competition dictionary
def new_competition_dict(competition):
    competition_dict = {}

    competition_dict['kaggle_competition_id'] = getattr(competition, 'id')
    title = getattr(competition, 'title')
    competition_dict['title'] = title
    description = getattr(competition, 'description')
    competition_dict['description'] = description

    ref = getattr(competition, 'ref')
    competition_dict['ref'] = ref
    # Do not use url directly, because many competition url is null
    competition_dict['url'] = 'https://www.kaggle.com/c/' + ref

    competition_dict['can_get_award_points'] = getattr(
        competition, 'awardsPoints')
    competition_dict['is_kernel_only'] = getattr(
        competition, 'isKernelsSubmissionsOnly')
    competition_dict['team_count'] = getattr(competition, 'teamCount')

    competition_dict['category'] = getattr(competition, 'category')

    # Add timezone
    competition_dict['started_at'] = getattr(
        competition, 'enabledDate').astimezone(timezone('UTC'))
    competition_dict['ended_at'] = getattr(
        competition, 'deadline').astimezone(timezone('UTC'))

    competition_dict['organization_name'] = getattr(
        competition, 'organizationName')
    competition_dict['organization_ref'] = getattr(
        competition, 'organizationRef')

    reward = getattr(competition, 'reward')
    # change reward format to int
    if reward[0] == '$':
        reward = reward[1:].replace(',', '')
    else:
        reward = 0
    competition_dict['reward'] = reward

    evaluation_metric = getattr(competition, 'evaluationMetric')
    if evaluation_metric == '':
        evaluation_metric = None
    competition_dict['evaluation_metric'] = evaluation_metric

    tags = getattr(competition, 'tags')
    # Class Tag convert to str
    tags = [str(tag) for tag in getattr(competition, 'tags')]
    tags = add_additional_tags(tags, evaluation_metric)

    data_types, tags = judge_data_types(tags, evaluation_metric)
    predict_type, tags = judge_predict_type(
        tags, title, description, evaluation_metric)

    competition_dict['tags'] = tags
    competition_dict['data_types'] = data_types
    competition_dict['predict_type'] = predict_type

    return competition_dict


def add_additional_tags(tags, evaluation_metric):
    if evaluation_metric is None:
        return tags

    # judge based on evaluation_metric
    evaluation_metric_keywords = {
        'objectdetection': 'object detection',
        'objectsegmentation': 'object segmentation',
    }
    for keyword in evaluation_metric_keywords:
        if keyword not in tags and evaluation_metric.lower().find(keyword) != -1:
            tags.append(evaluation_metric_keywords[keyword])
    return tags


def judge_data_types(tags, evaluation_metric):
    data_types = []
    for tag in tags:
        if tag.lower().find('data') != -1:
            data_types.append(tag.split()[0])
        elif tag == 'time series':
            data_types.append(tag)

    # judge based on evaluation_metric
    if 'image' not in data_types and evaluation_metric is not None and evaluation_metric.lower().find('image') != -1:
        data_types.append('image')

    # delete depulicate tag
    for data_type in data_types:
        if data_type == 'time series' and 'time series' in tags:
            tags.remove(data_type)
        elif data_type + ' data' in tags:
            tags.remove(data_type + ' data')

    return data_types, tags


def judge_predict_type(tags, title, description, evaluation_metric):
    predict_type = None

    predict_types = [
        'classification',
        'binary classification',
        'multiclass classification',
        'regression',
    ]
    for tag in tags:
        if tag in predict_types:
            predict_type = tag

    # judge based on title
    if predict_type is None:
        if title.lower().find('classification') != -1:
            predict_type = 'classification'

    # judge based on description
    if predict_type is None:
        if description.lower().find('classification') != -1:
            predict_type = 'classification'

    # judge based on evaluation_metric
    evaluation_metric_keywords = {
        'classification': 'classification',
        'accuracy': 'classification',
        'auc': 'classification',
        'area under receiver': 'classification',
        'f-score': 'classification',
        'loss': 'classification',
        'error': 'regression',
    }
    if predict_type is None and evaluation_metric is not None:
        for keyword in evaluation_metric_keywords:
            if evaluation_metric.lower().find(keyword) != -1:
                predict_type = evaluation_metric_keywords[keyword]
                break

    # delete depulicate tag
    if predict_type is not None and predict_type in tags:
        tags.remove(predict_type)

    return predict_type, tags


# create new Competition model
def create_competition(competition_dict):
    competition_model = Competition.objects.create(
        can_get_award_points=competition_dict['can_get_award_points'],
        category=competition_dict['category'],
        description=competition_dict['description'],
        started_at=competition_dict['started_at'],
        ended_at=competition_dict['ended_at'],
        evaluation_metric=competition_dict['evaluation_metric'],
        kaggle_competition_id=competition_dict['kaggle_competition_id'],
        is_kernel_only=competition_dict['is_kernel_only'],
        organization_name=competition_dict['organization_name'],
        organization_ref=competition_dict['organization_ref'],
        ref=competition_dict['ref'],
        url=competition_dict['url'],
        reward=competition_dict['reward'],
        team_count=competition_dict['team_count'],
        title=competition_dict['title'],
        tags=competition_dict['tags'],
        data_types=competition_dict['data_types'],
        predict_type=competition_dict['predict_type'],
    )

    message = 'New #kaggle competition \"{}\" is lauched.\n\nMedal: {}\nKernel Only: {}\nData Types: {}\n{}'.format(
        competition_dict['title'],
        competition_dict['can_get_award_points'],
        competition_dict['is_kernel_only'],
        competition_dict['data_types'],
        competition_dict['url'],
    )
    post_twitter(message)


# update new Competition model
def update_competition(competition_dict):
    obj = Competition.objects.get(
        kaggle_competition_id=competition_dict['kaggle_competition_id'])
    pre_ended_at = getattr(obj, 'ended_at')

    for (key, value) in competition_dict.items():
        setattr(obj, key, value)

    obj.save()

    # tweet when competition deadline is changed
    if competition_dict['ended_at'] != pre_ended_at:
        message = 'Deadline of #kaggle competition \"{}\" is changed.\n\nAfter: {}\nBefore: {}\n{}'.format(
            competition_dict['title'],
            competition_dict['ended_at'],
            pre_ended_at,
            competition_dict['url'],
        )
        post_twitter(message)


# create and update competitions
# If you want to create and update all competitions, change in_progress param to False
def save_competitions(page, in_progress=True):
    api = new_kaggle_api()

    competitions = api.competitions_list(sort_by='latestDeadline', page=page)
    time.sleep(1)
    for competition in competitions:
        if in_progress:
            now = datetime.datetime.utcnow()
            ended_at = getattr(competition, 'deadline')

            if ended_at < now:
                return 0

        if Competition.objects.filter(kaggle_competition_id=getattr(competition, 'id')).exists():
            update_competition(new_competition_dict(competition))
        else:
            create_competition(new_competition_dict(competition))

    if competitions != []:
        save_competitions(page=page+1, in_progress=in_progress)


def update_solution_count():
    for competition in Competition.objects.all():
        competition.solution_count = Solution.objects.filter(
            competition=competition.ref).count()
        competition.save()


def run():
    save_competitions(page=1, in_progress=True)
    update_solution_count()
