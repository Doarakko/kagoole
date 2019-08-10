import os
import json
import requests

from requests_oauthlib import OAuth1Session

SLACK_WEBHOOK_URL = os.environ['SLACK_WEBHOOK_URL']
TWITTER_API_KEY = os.environ['TWITTER_API_KEY']
TWITTER_API_SECRET = os.environ['TWITTER_API_SECRET']
TWITTER_ACCESS_TOKEN = os.environ['TWITTER_ACCESS_TOKEN']
TWITTER_ACCESS_TOKEN_SECRET = os.environ['TWITTER_ACCESS_TOKEN_SECRET']


def post_slack(title, value):
    payload = {
        'username': 'Kagoole',
        'icon_url': '',
        'attachments': [{
            'fallback': title,
            'color': '#D00000',
            'fields': [{
                'title': title,
                'value': value,
            }]
        }]
    }
    requests.post(SLACK_WEBHOOK_URL, data=json.dumps(payload))


def post_twitter(message):
    endpoint = 'https://api.twitter.com/1.1/'
    url = endpoint + 'statuses/update.json'

    params = {"status": message}
    session = OAuth1Session(TWITTER_API_KEY, TWITTER_API_SECRET,
                            TWITTER_ACCESS_TOKEN, TWITTER_ACCESS_TOKEN_SECRET)

    request = session.post(url=url, params=params)
