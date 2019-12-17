const AWS = require('aws-sdk');

const bucketName = 'zgallery.pictures';

function parseAlbumNames(data) {
  return data.CommonPrefixes.map((item) => item.Prefix.split('/')[1]);
}

function parsePictureNames(data) {
  return data.Contents
    .filter((item) => !item.Key.endsWith('/'))
    .map((item) => item.Key.split('/').slice(-1).pop());
}


async function getAlbums() {
  const awsS3Client = new AWS.S3({ apiVersion: '2006-03-01' });
  const params = {
    Bucket: bucketName,
    Prefix: 'test/',
    Delimiter: '/',
  };

  const data = await awsS3Client.listObjectsV2(params).promise();
  return parseAlbumNames(data);
}

async function getPictures(albumName) {
  const awsS3Client = new AWS.S3({ apiVersion: '2006-03-01' });
  const params = {
    Bucket: bucketName,
    Prefix: `test/${albumName}`,
  };

  const data = await awsS3Client.listObjectsV2(params).promise();
  if (data.Contents.length === 0) {
    return { Error: 404 };
  }
  return parsePictureNames(data);
}

exports.getAlbums = getAlbums;
exports.getPictures = getPictures;
