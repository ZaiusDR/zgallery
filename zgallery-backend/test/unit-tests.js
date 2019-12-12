const { expect } = require('chai');
const AWS = require('aws-sdk-mock');

const testConstants = require('./constants');
const awsService = require('../services/aws');


describe('Tests AWS Service', () => {

  it('should Return a list of albums', async () => {
    AWS.mock('S3', 'listObjectsV2', (params, callback) => {
      callback(null, testConstants.listAlbumsReturnData);
    });
    const expectedAlbums = ['album0', 'album1'];

    const albums = await awsService.getAlbums();

    expect(albums).to.eql(expectedAlbums);

    AWS.restore('S3');
  });

  it('should Return a list of pictures in an album', async () => {
    AWS.mock('S3', 'listObjectsV2', (params, callback) => {
      callback(null, testConstants.listPicturesReturnData);
    });
    const expectedPictures = ['photo0.jpg', 'photo1.jpg'];

    const pictures = await awsService.getPictures('album0');

    expect(pictures).to.eql(expectedPictures);

    AWS.restore('S3');
  });
});
