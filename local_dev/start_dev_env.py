#!/usr/bin/env python
import os
import subprocess

import boto3

session = boto3.Session()

credentials = session.get_credentials()

os.environ['AWS_ACCESS_KEY_ID'] = credentials.access_key
os.environ['AWS_SECRET_ACCESS_KEY'] = credentials.secret_key
os.environ['AWS_DEFAULT_REGION'] = session.region_name

subprocess.check_call(['docker-compose', 'up', '-d'])
