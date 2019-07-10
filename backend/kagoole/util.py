import os
import json
import requests


SLACK_WEBHOOK_URL = os.environ['SLACK_WEBHOOK_URL']


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
