import boto3
import io
import logging

from PIL import Image
from resizeimage import resizeimage

logger = logging.getLogger()
logger.setLevel(logging.INFO)

RESIZED_FOLDER = 'resized/'
RESIZED_HEIGHT = 1500


def lambda_handler(event, context):
    logger.info('Received event: {0}'.format(event))
    bucket_name = event['Records'][0]['s3']['bucket']['name']
    picture_key = event['Records'][0]['s3']['object']['key']

    if RESIZED_FOLDER in picture_key:
        return {}

    s3 = boto3.resource('s3')
    bucket = s3.Bucket(bucket_name)
    original_picture = s3.Object(bucket.name, picture_key)

    resized_image = _resize_picture(original_picture)
    sent_data = _upload_resized_image(bucket, _get_resized_path(original_picture.key), resized_image)

    logger.info('Resized picture uploaded: {0}'.format(sent_data))

    return sent_data


def _resize_picture(original_picture):
    file_byte_string = original_picture.get()['Body'].read()
    image = Image.open(io.BytesIO(file_byte_string))
    resized_image = resizeimage.resize_height(image, RESIZED_HEIGHT)

    return resized_image


def _get_resized_path(original_path):
    splitted_path = original_path.split('/')
    filename = splitted_path[-1]
    folder = '/'.join(splitted_path[0:-1])
    return '{0}/{1}{2}'.format(folder, RESIZED_FOLDER, filename)


def _upload_resized_image(bucket, picture_key, resized_image):
    in_mem_file = io.BytesIO()
    resized_image.save(in_mem_file, 'JPEG')
    in_mem_file.seek(0)
    return bucket.put_object(Key=picture_key, Body=in_mem_file)

