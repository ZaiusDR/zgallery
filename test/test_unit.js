var rewire = require('rewire');

var aws = rewire('../aws/aws');

const parseS3Items = aws.__get__('parseS3Items');

const s3ItemsData = {Contents : [
  {'Key': 'test/folder0/'},
  {'Key': 'test/folder0/photo0.jpg'},
  {'Key': 'test/folder0/photo1.jpg'},
  {'Key': 'test/folder1/'},
  {'Key': 'test/folder1/photo2.jpg'},
  {'Key': 'test/folder1/photo3.jpg'}
]};

describe('Test parseS3Items', () => {
  it('it should return a list of album names', () => {
    parseS3Items(s3ItemsData, null).should.deep.equal(
      ['folder0','folder1']
    );
  });
  it('it should return a list of photo names for album0', () => {
    parseS3Items(s3ItemsData, 'folder0').should.deep.equal(
      ['photo0.jpg','photo1.jpg']
    );
  });
});
