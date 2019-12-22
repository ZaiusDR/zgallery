const chai = require('chai');
const chaiHttp = require('chai-http');

const { expect } = chai;

const configuration = require('../settings');

const zgalleryURL = configuration.serverUrl;

chai.use(chaiHttp);

describe('API E2E Tests', () => {
  it('Should return a list of Albums with thumbnails', (done) => {
    chai
      .request(zgalleryURL)
      .get('/api/v1/albums')
      .end((end, res) => {
        expect(res).to.have.status(200);
        expect(res.body.length).to.be.greaterThan(0);
        expect(res.body[0].thumbs.length).to.be.greaterThan(0);
        done();
      });
  });

  it('Should return the list of Pictures in an Album', (done) => {
    chai
      .request(zgalleryURL)
      .get('/api/v1/albums/China')
      .end((end, res) => {
        expect(res).to.have.status(200);
        expect(res.body.length).to.be.greaterThan(0);
        done();
      });
  });
});
