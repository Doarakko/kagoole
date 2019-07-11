import time

from kaggle import KaggleApi


def new_kaggle_api():
    api = KaggleApi()
    api.authenticate()

    return api


TAG = {'internet': 15, 'tabular data': 82, 'text data': 25, 'basketball': 8, 'sports': 7, 'multiclass classification': 38, 'oceanography': 3, 'image data': 57, 'ranking': 5, 'board games': 1, 'future prediction': 11, 'linguistics': 5, 'regression': 14, 'forestry': 3, 'cycling': 1, 'binary classification': 26, 'card games': 1, 'film': 2, 'taxi services': 3, 'optometry': 1, 'health sciences': 3, 'marketing': 4, 'click prediction': 2, 'counting': 2, 'housing': 4, 'manufacturing': 2, 'signal data': 2, 'object segmentation': 6, 'physics': 3, 'food and drink': 6, 'animals': 9, 'object detection': 7, 'mathematical optimization': 4, 'finance': 4, 'hotels': 2, 'recommendation': 2, 'artificial intelligence': 1, 'healthcare': 6, 'object labeling': 5, 'banking': 8, 'crime': 1, 'timelines': 1, 'geography': 1, 'duplicate detection': 3, 'object recognition': 2, 'automobiles': 3, 'mobile web': 1, 'demographics': 1, 'business': 1, 'painting': 2,
       'mathematics': 1, 'numbers': 1, 'diseases': 1, 'object identification': 8, 'fishing': 1, 'plants': 4, 'clothing': 1, 'ecology': 2, 'market basket': 1, 'adversarial learning': 3, 'human genetics': 1, 'time series': 4, 'languages': 2, 'terrorism': 1, 'literature': 1, 'real estate': 1, 'weather': 1, 'shipping': 1, 'semiconductors': 1, 'chemistry': 2, 'arguments': 1, 'biology': 2, 'crowdfunding': 1, 'sound technology': 3, 'video data': 2, 'home': 1, 'geology': 1, 'medicine': 3, 'writing': 1, 'astronomy': 1, 'health': 1, 'american football': 1, 'safety': 1, 'classification': 2, 'optimization': 1, 'video games': 1, 'signal processing': 3, 'research': 2, 'oncology and cancer': 1, 'robotics': 1, 'nlp': 3, 'children': 1, 'education': 1, 'earth sciences': 1, 'visual arts': 1, 'audio data': 1, 'employment': 1, 'nature': 1, 'biases': 1, 'money': 1, 'news agencies': 1, 'relationships': 1, 'image processing': 2, 'tutorial': 1}


def get_all_competitions(page):
    api = new_kaggle_api()

    competitions = api.competitions_list(page=page, sort_by='earliestDeadline')
    time.sleep(1)
    for competition in competitions:
        category = getattr(competition, 'category')
        titile = getattr(competition, 'title')
        if category is None:
            print('{}: {}'.format(titile, category))
        # tags = getattr(competition, 'tags')
        # Class Tag convert to str
        # tags = [str(tag) for tag in getattr(competition, 'tags')]

        # for i in tags:
        #     if i in TAG:
        #         TAG[i] += 1
        #     else:
        #         TAG[i] = 1

    if competitions != []:
        get_all_competitions(page=page+1)


def run():
    get_all_competitions(page=1)

    # for x, y in TAG.items():
    #     print(x, y)

    # if x.find('data') != -1:
    #     print(x, y)
