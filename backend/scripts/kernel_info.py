import time

from kaggle import KaggleApi


COMPETITION = 'champs-scalar-coupling'


def new_kaggle_api():
    api = KaggleApi()
    api.authenticate()

    return api


def print_kernel_info(page):
    api = new_kaggle_api()

    kernels = api.kernels_list(
        competition=COMPETITION, page=page, page_size=20)

    time.sleep(1)
    for kernel in kernels:
        for i in dir(kernel):
            print('{}: {}'.format(i, getattr(kernel, i)))

    # if kernels != []:
    #     print_kernel_info(page=page+1)


def run():
    print_kernel_info(page=1)
