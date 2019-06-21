import json
from logging import StreamHandler, INFO, DEBUG, Formatter, FileHandler, getLogger

from kaggle import KaggleApi

logger = getLogger(__name__)
log_fmt = Formatter(
    '%(asctime)s %(name)s %(lineno)d [%(levelname)s][%(funcName)s] %(message)s')
# info
handler = StreamHandler()
handler.setLevel(INFO)
handler.setFormatter(log_fmt)
logger.addHandler(handler)
logger.setLevel(INFO)
# debug
handler = StreamHandler()
handler.setLevel(DEBUG)
handler.setFormatter(log_fmt)
logger.addHandler(handler)
logger.setLevel(DEBUG)

DIR = 'fixtures/sample/'


def open_json(path):
    try:
        with open(path) as f:
            f_json = f.read()
            f_json = json.loads(f_json)

        msg = 'Load {}'.format(path)
        logger.debug(msg)
        return f_json
    except Exception as e:
        logger.error(e)


def save_json(f_json, file_name):
    path = DIR + file_name + '.json'
    try:
        with open(path, 'w') as f:
            json.dump(f_json, f)
        msg = 'Load {}'.format(path)
        logger.debug(msg)
    except Exception as e:
        logger.error(e)


def new_kaggle_api():
    api = KaggleApi()
    api.authenticate()
    return api


def create_competition(competition):
    competition_json = open_json(DIR + 'competition.json')

    competition_json['awards_points'] = getattr(competition, 'awardsPoints')
    competition_json['category'] = getattr(competition, 'category')
    competition_json['ended_at'] = str(getattr(competition, 'deadline'))
    competition_json['description'] = getattr(competition, 'description')
    competition_json['started_at'] = str(getattr(competition, 'enabledDate'))
    competition_json['evaluation_metric'] = getattr(
        competition, 'evaluationMetric')
    competition_json['competition_id'] = getattr(competition, 'id')
    competition_json['is_kernel_only'] = getattr(
        competition, 'isKernelsSubmissionsOnly')
    competition_json['organization_name'] = getattr(
        competition, 'organizationName')
    competition_json['organization_ref'] = getattr(
        competition, 'organizationRef')
    competition_json['ref'] = getattr(competition, 'ref')
    competition_json['reward'] = getattr(competition, 'reward')
    competition_json['team_count'] = getattr(competition, 'teamCount')
    competition_json['title'] = getattr(competition, 'title')
    competition_json['url'] = getattr(competition, 'url')

    save_json(competition_json, getattr(competition, 'ref'))


if __name__ == "__main__":
    api = new_kaggle_api()
    for competition in api.competitions_list(page=1):
        create_competition(competition)
