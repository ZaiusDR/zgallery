import boto3
import json
import pytest

from moto import mock_s3

from thumbnails_sam.create_thumbnails import app


@pytest.fixture()
def event_s3_put_object():
    with open('events/event.json') as json_file:
        event_json = json.load(json_file)
    return event_json


@mock_s3
def test_lambda_handler(event_s3_put_object):
    event_record = event_s3_put_object['Records'][0]
    event_region = event_record['awsRegion']
    bucket_name = event_record['s3']['bucket']['name']
    file_key = event_record['s3']['object']['key']
    conn = boto3.resource('s3', region_name=event_region)
    conn.create_bucket(Bucket=bucket_name)
    conn.Object(bucket_name=bucket_name, key=file_key).put()

    ret = app.lambda_handler(event_s3_put_object, '')
    print('This is the response {}'.format(ret))

    assert ret

