var aws = require('aws-sdk');

require('dotenv').config()

var s3 = new aws.S3();

var envPath = process.env.ENVIRONMENT + '/';

function parseAlbumNames(albumData) {
    var albumList = [];
    albumData.Contents.forEach((albumInfo) => {
        albumName = albumInfo['Key'].split('/')[1];
        albumList.push(albumName);
    });
    return albumList;
}

function getAlbums() {
    var params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Prefix: envPath,
        StartAfter: envPath
    }

    listBuckets = s3.listObjectsV2(params).promise();

    return listBuckets.then((data) => {
        return parseAlbumNames(data);
    }).catch((err) => {
        console.log(err);
    });
}

module.exports = getAlbums;
