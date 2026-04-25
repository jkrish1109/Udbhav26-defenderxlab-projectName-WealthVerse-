import boto3
import os
from botocore.exceptions import NoCredentialsError

# Load from environment variables
s3 = boto3.client(
    's3',
    aws_access_key_id=os.getenv('AWS_ACCESS_KEY_ID'),
    aws_secret_access_key=os.getenv('AWS_SECRET_ACCESS_KEY'),
    region_name=os.getenv('AWS_REGION', 'ap-south-1') # Default to Mumbai
)

BUCKET_NAME = os.getenv('S3_BUCKET_NAME', 'wealthverse-voice-data')

def upload_to_s3(file_path: str, object_name: str) -> str:
    """
    Uploads a file to AWS S3 and returns the public URL.
    """
    try:
        s3.upload_file(file_path, BUCKET_NAME, object_name, ExtraArgs={'ACL': 'public-read'})
        url = f"https://{BUCKET_NAME}.s3.amazonaws.com/{object_name}"
        return url
    except FileNotFoundError:
        print("The file was not found")
        return None
    except NoCredentialsError:
        print("Credentials not available")
        return None
