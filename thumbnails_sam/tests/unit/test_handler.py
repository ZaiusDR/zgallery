import io
import boto3
import json
import pytest

from moto import mock_s3
from PIL import Image

from create_thumbnails import app


@pytest.fixture
def event_s3_put_object_event():
    with open('events/upload_picture.json') as json_file:
        event_json = json.load(json_file)
    return event_json


@pytest.fixture
def event_s3_put_resized_object_event():
    with open('events/upload_resized_picture.json') as json_file:
        event_json = json.load(json_file)
    return event_json


@pytest.fixture
def test_image():
    image = Image.new(mode='RGB', size=(2500, 3000), color='red')
    in_mem_file = io.BytesIO()
    image.save(in_mem_file, format='JPEG')
    in_mem_file.seek(0)
    return in_mem_file


@pytest.fixture
def event_parsed_data(event_s3_put_object_event):
    event_record = event_s3_put_object_event['Records'][0]
    return {
        'bucket_name': event_record['s3']['bucket']['name'],
        'file_key': event_record['s3']['object']['key'],
        'aws_region': event_record['awsRegion']
    }


@pytest.fixture(scope='function')
def s3_mock_fixture(event_parsed_data, test_image):
    with mock_s3():
        s3_resource = boto3.resource('s3', region_name=event_parsed_data['aws_region'])
        s3_resource.create_bucket(Bucket=event_parsed_data['bucket_name'])
        s3_resource.Object(
            bucket_name=event_parsed_data['bucket_name'],
            key=event_parsed_data['file_key']
        ).put(Body=test_image)
        yield s3_resource


def test_lambda_handler__should_resize_to_1500_height_for_carousel(event_s3_put_object_event, s3_mock_fixture):
    returned_info = app.lambda_handler(event_s3_put_object_event, '')

    image_data = s3_mock_fixture.Object(
        bucket_name=returned_info.bucket_name,
        key=returned_info.key
    ).get()['Body'].read()
    resized_image = Image.open(io.BytesIO(image_data))
    width, height = resized_image.size

    assert height == app.RESIZED_HEIGHT


def test_lambda_handler__should_add_resized_folder_to_orignal_path(event_s3_put_object_event, s3_mock_fixture):
    returned_info = app.lambda_handler(event_s3_put_object_event, '')

    assert returned_info.key == 'prod/album0/resized/HappyFace.jpg'


def test_lambda_handler__should_not_resize_on_resized_picture_put_events(event_s3_put_resized_object_event):
    returned_info = app.lambda_handler(event_s3_put_resized_object_event, '')

    assert not returned_info
