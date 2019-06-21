import os
import time
import datetime

from kaggle import KaggleApi

from backend import settings
from kagoole.models import Competition


DATA_TYPES = [
    'tabular data',
    'text data',
    'image data',
    'audio data',
]

PREDICT_TYPE = [
    'binary classification',
    'multiclass classification',
    'regression',
]


def new_kaggle_api():
    api = KaggleApi()
    api.authenticate()

    return api


# create new Competition model
def new_competition(competition):
    can_get_award_points = getattr(competition, 'awardsPoints')
    category = getattr(competition, 'category')
    description = getattr(competition, 'description')
    started_at = getattr(competition, 'enabledDate')
    ended_at = getattr(competition, 'deadline')

    evaluation_metric = getattr(competition, 'evaluationMetric')
    if evaluation_metric == '':
        evaluation_metric = None

    competition_id = getattr(competition, 'id')
    is_kernel_only = getattr(competition, 'isKernelsSubmissionsOnly')
    organization_name = getattr(competition, 'organizationName')
    organization_ref = getattr(competition, 'organizationRef')
    ref = getattr(competition, 'ref')
    reward = getattr(competition, 'reward')

    team_count = getattr(competition, 'teamCount')
    title = getattr(competition, 'title')
    url = getattr(competition, 'url')

    tags = getattr(competition, 'tags')

    # Class Tag convert to str
    tags = [str(tag) for tag in getattr(competition, 'tags')]
    data_types = judge_data_types(tags)

    competition_model = Competition(
        can_get_award_points=can_get_award_points,
        category=category,
        description=description,
        started_at=started_at,
        ended_at=ended_at,
        evaluation_metric=evaluation_metric,
        competition_id=competition_id,
        is_kernel_only=is_kernel_only,
        organization_name=organization_name,
        organization_ref=organization_ref,
        ref=ref,
        reward=reward,
        team_count=team_count,
        title=title,
        # tags=tags,
        # data_types=data_types,
    )

    return competition_model


def judge_data_types(tags):
    # tabular, text, image, audio
    is_etc_data = True

    data_types = []
    for tag in tags:
        if tag in DATA_TYPES:
            data_types.append(tag)
            is_etc_data = False

    if is_etc_data:
        data_types.append('etc')

    return data_types


def judge_predict_type(tags):
    pass


def create_new_competitions():
    api = new_kaggle_api()

    for competition in api.competitions_list(sort_by='recentlyCreated'):
        start_date = getattr(competition, 'enabledDate')

        # assume to run once a day
        pre_date = datetime.datetime.utcnow() - datetime.timedelta(days=1)

        if start_date >= pre_date:
            competition_model = new_competition(competition)
            competition_model.save()


def create_all_competitions(page):
    api = new_kaggle_api()

    competitions = api.competitions_list(page=page, sort_by='earliestDeadline')
    time.sleep(1)
    for competition in competitions:
        competition_model = new_competition(competition)
        competition_model.save()

    if competitions != []:
        create_all_competitions(page=page+1)


def run():
    # create_new_competitions()

    create_all_competitions(page=1)
