import time

from kaggle import KaggleApi


def new_kaggle_api():
    api = KaggleApi()
    api.authenticate()

    return api


def print_tags(page):
    api = new_kaggle_api()

    competitions = api.competitions_list(page=page, sort_by='earliestDeadline')
    time.sleep(1)
    for competition in competitions:
        titile = getattr(competition, 'title')
        tags = getattr(competition, 'tags')

        # Class Tag convert to str
        tags = [str(tag) for tag in getattr(competition, 'tags')]

        # for i in tags:
        #     if i in TAG:
        #         TAG[i] += 1
        #     else:
        #         TAG[i] = 1

    if competitions != []:
        print_tags(page=page+1)


def run():
    print_tags(page=1)
