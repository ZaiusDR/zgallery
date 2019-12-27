import boto3


def lambda_handler(event, context):
    print('this is the event: {0}'.format(event))
    s3_client = boto3.client('s3')
    bucket = event['Records'][0]['s3']['bucket']['name']
    picture_key = event['Records'][0]['s3']['object']['key']
    s3_response = s3_client.get_object(Bucket=bucket, Key=picture_key)
    picture = s3_response['Body']

    return event
