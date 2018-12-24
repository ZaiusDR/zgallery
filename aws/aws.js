var aws = require('aws-sdk');

require('dotenv').config()

var s3 = new aws.S3();

var envPath = process.env.ENVIRONMENT + '/';


const params = {
  Bucket: process.env.AWS_BUCKET_NAME,
  Prefix: envPath,
  StartAfter: envPath
};

const listBucket = s3.listObjectsV2(params).promise();

function parseS3Items(s3ItemsData, albumId) {
  var itemSet = new Set();
  s3ItemsData.Contents.forEach((item) => {
    if (albumId === null) {
      if (item['Key'].endsWith('/')) {
        albumName = item['Key'].split('/')[1];
        itemSet.add(albumName);
      }
    }
    else {
      if (!item['Key'].endsWith('/') && item['Key'].includes(albumId)) {
        photoName = item['Key'].split('/')[2];
        itemSet.add(photoName);
      }
    }
  });
  return [...itemSet];
};

function getAlbums() {
    return listBucket.then((data) => {
        return parseS3Items(data, null);
    }).catch((err) => {
        console.log(err);
    });
}

function getPictures(albumName) {
    return listBucket.then((data) => {
      return parseS3Items(data, albumName);
    }).catch((err) => {
      console.log(err);
    });
}

module.exports = {
  getAlbums: getAlbums,
  getPictures: getPictures
};
