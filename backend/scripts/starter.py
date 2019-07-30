from scripts.batch import save_competitions


def run():
    save_competitions(page=1, in_progress=False)
