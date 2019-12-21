const { expect } = require('chai');
const AWS = require('aws-sdk-mock');

const testConstants = require('./constants');
const awsService = require('../services/aws');


describe('Tests AWS Service', () => {
  it('should Return a list of albums with first 5 thumbnails', async () => {
    AWS.mock('S3', 'listObjectsV2', (params, callback) => {
      if (params.Prefix.includes('thumbs')) {
        callback(null, testConstants.listThumbnailsReturnData);
      } else {
        callback(null, testConstants.listAlbumsReturnData);
      }
    });
    const expectedAlbums = [
      {
        albumName: 'album0',
        thumbs: ['thumb01.jpg', 'thumb02.jpg'],
      },
      {
        albumName: 'album1',
        thumbs: ['thumb01.jpg', 'thumb02.jpg'],
      },
    ];

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

  it('should Return 404 on album not found', async () => {
    AWS.mock('S3', 'listObjectsV2', (params, callback) => {
      callback(null, testConstants.albumNotFoundReturnData);
    });
    const response = await awsService.getPictures('nonExistingAlbum');

    expect(response).to.eql({ Error: 404 });

    AWS.restore('S3');
  });
});
