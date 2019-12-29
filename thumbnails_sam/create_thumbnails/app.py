import boto3
import io
import logging

from PIL import Image

logger = logging.getLogger()
logger.setLevel(logging.INFO)

RESIZED_FOLDER = 'resized'
THUMBNAIL_FOLDER = 'thumbs'
RESIZED_HEIGHT = 1500
THUMBNAIL_HEIGHT = 500
# This is to ensure the Height is always taken into account
FAKE_WIDTH = 20000

FOLDER_MAPPING = {
    RESIZED_HEIGHT: RESIZED_FOLDER,
    THUMBNAIL_HEIGHT: THUMBNAIL_FOLDER
}


def lambda_handler(event, context):
    logger.info('Received event: {0}'.format(event))

    resized_info = {}
    bucket_name = event['Records'][0]['s3']['bucket']['name']
    picture_key = event['Records'][0]['s3']['object']['key']

    if any(folder in picture_key for folder in [RESIZED_FOLDER, THUMBNAIL_FOLDER]):
        return resized_info

    s3 = boto3.resource('s3')
    bucket = s3.Bucket(bucket_name)
    original_picture = s3.Object(bucket.name, picture_key)

    for height in [RESIZED_HEIGHT, THUMBNAIL_HEIGHT]:
        resized_image = _resize_picture(original_picture, height)
        response = _upload_resized_image(
            bucket,
            _get_resized_path(original_picture.key, FOLDER_MAPPING[height]),
            resized_image
        )
        resized_info.update({'bucket_name': response.bucket_name})
        resized_info.update({FOLDER_MAPPING[height]: response.key})

    logger.info('Resized picture uploaded: {0}'.format(resized_info))

    return resized_info


def _resize_picture(original_picture, height):
    file_byte_string = original_picture.get()['Body'].read()
    image = Image.open(io.BytesIO(file_byte_string))
    image.thumbnail([FAKE_WIDTH, height], Image.ANTIALIAS)

    return image


def _get_resized_path(original_path, resized_folder):
    splitted_path = original_path.split('/')
    filename = splitted_path[-1]
    folder = '/'.join(splitted_path[0:-1])
    return '{0}/{1}/{2}'.format(folder, resized_folder, filename)


def _upload_resized_image(bucket, picture_key, resized_image):
    print(picture_key)
    in_mem_file = io.BytesIO()
    resized_image.save(in_mem_file, format='JPEG', quality=80, optimize=True, progressive=True)
    in_mem_file.seek(0)

    return bucket.put_object(Key=picture_key, Body=in_mem_file)

