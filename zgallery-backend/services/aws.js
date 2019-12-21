const AWS = require('aws-sdk');

const configuration = require('../settings');

const bucketName = 'zgallery.pictures';

function parseAlbumNames(data) {
  return data.CommonPrefixes.map((item) => item.Prefix.split('/')[1]);
}

function parsePictureNames(data) {
  return data.Contents
    .filter((item) => (!item.Key.endsWith('/') && !item.Key.includes('/thumbs')))
    .map((item) => item.Key.split('/').slice(-1).pop());
}

function parseThumbsNames(data) {
  return data.Contents
    .filter((item) => !item.Key.endsWith('/'))
    .map((item) => item.Key.split('/').slice(-1).pop());
}

async function getThumbs(albumName) {
  const awsS3Client = new AWS.S3({ apiVersion: '2006-03-01' });
  const params = {
    Bucket: bucketName,
    Prefix: `${configuration.bucketFolder}${albumName}/thumbs/`,
  };

  const data = await awsS3Client.listObjectsV2(params).promise();
  return parseThumbsNames(data);
}

function gatherAlbumsInfo(albumNames) {
  return Promise.all(albumNames.map(async (albumName) => {
    const thumbs = await getThumbs(albumName);

    return {
      albumName,
      thumbs,
    };
  }));
}

async function getAlbums() {
  const awsS3Client = new AWS.S3({ apiVersion: '2006-03-01' });
  const params = {
    Bucket: bucketName,
    Prefix: configuration.bucketFolder,
    Delimiter: '/',
  };

  const data = await awsS3Client.listObjectsV2(params).promise();
  const albumNames = await parseAlbumNames(data);

  return gatherAlbumsInfo(albumNames);
}

async function getPictures(albumName) {
  const awsS3Client = new AWS.S3({ apiVersion: '2006-03-01' });
  const params = {
    Bucket: bucketName,
    Prefix: `${configuration.bucketFolder}${albumName}`,
  };

  const data = await awsS3Client.listObjectsV2(params).promise();
  if (data.Contents.length === 0) {
    return { Error: 404 };
  }
  return parsePictureNames(data);
}

exports.getAlbums = getAlbums;
exports.getPictures = getPictures;
