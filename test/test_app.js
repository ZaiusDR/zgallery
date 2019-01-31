const chai = require('chai');
const chaiHttp = require('chai-http');
const should = require('chai').should();
const expect = chai.expect;

chai.use(chaiHttp);

const serverUrl = 'http://localhost:3000';


describe('Test REST API', () => {
  describe('/GET /', () => {
    it('it should GET welcome page', (done) => {
      chai.request(serverUrl)
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
      chai.request(serverUrl)
        .get('/albums')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array').to.have.lengthOf(2);
          res.text.should.equal('["album0","album1"]');
          done();
        });
    });
  });

  describe('GET /albums/:id', () => {
    it('it should GET a list of pictures inside an album', (done) => {
      chai.request(serverUrl)
        .get('/albums/album0')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array').to.have.lengthOf(2);
          res.text.should.equal('["photo0.jpg","photo1.jpg"]');
          done();
        });
    });
  });

  describe('POST /albums', function() {
    it('it should create new_album', (done) => {
      chai.request(serverUrl)
        .post('/albums')
        .send({'name': 'new_album'})
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.text.should.contain('Successfully created album: new_album');
          done();
        });
    });

    it('it should clean new_album', function(done) {
      // Delete new_album
      chai.request(serverUrl)
        .delete('/albums/new_album')
        .end((err, res) => {
          res.should.have.status(200);
          res.should.have.be.a('object');
          done();
        });
    });

    it('it should warn an album exists', (done) => {
      chai.request(serverUrl)
        .post('/albums')
        .send({'name': 'album0'})
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.text.should.equal('Album album0 already exists.');
          done();
        });
    });
  });

  describe('DELETE /albums/:id', function() {
    it('it should create to_delete_album', (done) => {
      chai.request(serverUrl)
        .post('/albums')
        .send({'name': 'to_delete_album'})
        .end((err, res) => {
          res.should.have.status(201);
          done();
        });
    });

    it('it should delete to_delete_album', (done) => {
      chai.request(serverUrl)
        .delete('/albums/to_delete_album')
        .end((err, res) => {
          res.should.have.status(200);
          res.text.should.equal('Album to_delete_album successfully deleted.');
          done();
        });
    });

    it('it should warn an album doesn\'t exist', (done) => {
      chai.request(serverUrl)
        .delete('/albums/non_existent_album')
        .end((err, res) => {
          res.should.have.status(400);
          res.text.should.equal('Album non_existent_album does not exist.');
          done();
        });
    });
  });
});
