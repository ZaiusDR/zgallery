var rewire = require("rewire");

var aws = rewire('../aws/aws');

const parseAlbumNames = aws.__get__('parseAlbumNames');

describe('Test parseAlbumNames', () => {
  it('it should clean up the album folder names', () => {
    var albums = {Contents : [
      {'Key': '/folder0'},
      {'Key': '/folder1'}
    ]};
    parseAlbumNames(albums).should.deep.equal(
      ["folder0","folder1"]
    );
  })
})
