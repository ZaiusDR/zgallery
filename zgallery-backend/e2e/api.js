const chai = require('chai');
const chaiHttp = require('chai-http');

const { expect } = chai;

const configuration = require('../settings');

const zgalleryURL = configuration.serverUrl;

chai.use(chaiHttp);

describe('API E2E Tests', () => {
  it('Should return a list of Albums', (done) => {
    const expectedAlbums = [
      {
        albumName: 'album0',
        thumbs: ['thumb01.jpg', 'thumb02.jpg'],
      },
      {
        albumName: 'album1',
        thumbs: ['thumb03.jpg', 'thumb04.jpg'],
      },
    ];
    chai
      .request(zgalleryURL)
      .get('/api/v1/albums')
      .end((end, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.eqls(expectedAlbums);
        done();
      });
  });

  it('Should return the list of Pictures in an Album', (done) => {
    chai
      .request(zgalleryURL)
      .get('/api/v1/albums/album0')
      .end((end, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.eqls(['photo0.jpg', 'photo1.jpg']);
        done();
      });
  });
});
