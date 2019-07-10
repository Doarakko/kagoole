import os
import time
import datetime
from pytz import timezone

from kaggle import KaggleApi

from backend import settings
from kagoole.models import Competition, Solution


PREDICT_TYPE = [
    'classification',
    'binary classification',
    'multiclass classification',
    'regression',
]


def new_kaggle_api():
    api = KaggleApi()
    api.authenticate()

    return api


# create new competition dictionary
def new_competition_dict(competition):
    competition_dict = {}

    competition_dict['competition_id'] = getattr(competition, 'id')
    competition_dict['title'] = getattr(competition, 'title')

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
    competition_dict['description'] = getattr(competition, 'description')

    # Add timezone
    competition_dict['started_at'] = getattr(
        competition, 'enabledDate').astimezone(timezone('UTC'))
    competition_dict['ended_at'] = getattr(
        competition, 'deadline').astimezone(timezone('UTC'))

    evaluation_metric = getattr(competition, 'evaluationMetric')
    if evaluation_metric == '':
        evaluation_metric = None
    competition_dict['evaluation_metric'] = evaluation_metric

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

    tags = getattr(competition, 'tags')
    # Class Tag convert to str
    tags = [str(tag) for tag in getattr(competition, 'tags')]

    data_types = judge_data_types(tags)
    for data_type in data_types:
        if data_type == 'time series':
            tags.remove(data_type)
        else:
            tags.remove(data_type + ' data')

    predict_type = judge_predict_type(tags)
    if predict_type is not None:
        tags.remove(predict_type)

    competition_dict['tags'] = tags
    competition_dict['data_types'] = data_types
    competition_dict['predict_type'] = predict_type

    return competition_dict


def judge_data_types(tags):
    data_types = []
    for tag in tags:
        if tag.find('data') != -1:
            data_types.append(tag.split()[0])
        elif tag == 'time series':
            data_types.append(tag)

    return data_types


def judge_predict_type(tags):
    predict_type = None
    for tag in tags:
        if tag in PREDICT_TYPE:
            predict_type = tag

    return predict_type


# create new Competition model
def create_competition(competition_dict):
    competition_model = Competition.objects.create(
        can_get_award_points=competition_dict['can_get_award_points'],
        category=competition_dict['category'],
        description=competition_dict['description'],
        started_at=competition_dict['started_at'],
        ended_at=competition_dict['ended_at'],
        evaluation_metric=competition_dict['evaluation_metric'],
        competition_id=competition_dict['competition_id'],
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


# update new Competition model
def update_competition(competition_dict):
    obj = Competition.objects.get(
        competition_id=competition_dict['competition_id'])

    for (key, value) in competition_dict.items():
        setattr(obj, key, value)

    obj.save()


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

        if Competition.objects.filter(competition_id=getattr(competition, 'id')).exists():
            update_competition(new_competition_dict(competition))
        else:
            create_competition(new_competition_dict(competition))

    if competitions != []:
        save_competitions(page=page+1, in_progress=in_progress)


def update_solution_count():
    for competition in Competition.objects.all():
        competition.solution_count = Solution.objects.filter(
            competition=competition.id).count()
        competition.save()


def run():
    save_competitions(page=1)
    update_solution_count()
