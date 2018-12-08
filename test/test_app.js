let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let expect = chai.expect;

//let server = require('../bin/www')

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
