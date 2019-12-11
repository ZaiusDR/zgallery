const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

const { expect } = chai;

chai.use(chaiHttp);

describe('API E2E Tests', () => {
  it('Should return a list of Albums', (done) => {
    chai
      .request(app)
      .get('/api/v1/albums')
      .end((end, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.eqls(['album0', 'album1']);
        done();
      });
  });

  it('Should return the list of Pictures in an Album', (done) => {
    chai
      .request(app)
      .get('/api/v1/albums/album0')
      .end((end, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.eqls(['photo0.jpg', 'photo1.jpg']);
        done();
      });
  });
});
