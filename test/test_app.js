let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let expect = chai.expect;

chai.use(chaiHttp);

describe('/GET /', () => {
  it('it should GET welcome page', (done) => {
    chai.request('http://localhost:3000')
      .get('/')
      .end((err, res) => {
        expect(err).to.be.null;
        res.should.have.status(200);
        done();
    });
  });
});

describe('GET /albums', () => {
  it('it should GET a list of albums', (done) => {
    chai.request('http://localhost:3000')
      .get('/albums')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array').to.have.lengthOf(2);
        res.text.should.equal('["album0","album1"]');
        done();
    });
  });
});
