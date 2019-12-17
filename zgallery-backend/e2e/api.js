const chai = require('chai');
const chaiHttp = require('chai-http');

const { expect } = chai;

const zgalleryURL = 'http://backend.zgallery.esuarez.info';

chai.use(chaiHttp);

describe('API E2E Tests', () => {
  it('Should return a list of Albums', (done) => {
    chai
      .request(zgalleryURL)
      .get('/api/v1/albums')
      .end((end, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.eqls(['album0', 'album1']);
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
