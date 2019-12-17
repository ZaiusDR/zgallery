const listAlbumsReturnData = {
  IsTruncated: false,
  Contents:
    [{
      Key: 'test/',
      LastModified: '2018-12-09T09:20:20.000Z',
      ETag: '"d41d8cd98f00b204e9800998ecf8427e"',
      Size: 0,
      StorageClass: 'STANDARD',
    }],
  Name: 'z.gallery.photos',
  Prefix: 'test/',
  Delimiter: '/',
  MaxKeys: 1000,
  CommonPrefixes: [{ Prefix: 'test/album0/' }, { Prefix: 'test/album1/' }],
  KeyCount: 3,
};

const listPicturesReturnData = {
  IsTruncated: false,
  Contents:
    [{
      Key: 'test/album0/',
      LastModified: '2018-12-29T11:49:27.000Z',
      ETag: '"d41d8cd98f00b204e9800998ecf8427e"',
      Size: 0,
      StorageClass: 'STANDARD',
    },
    {
      Key: 'test/album0/photo0.jpg',
      LastModified: '2018-12-17T20:50:00.000Z',
      ETag: '"ee28bffd9b51109b0e357f0602628d28"',
      Size: 52252,
      StorageClass: 'STANDARD',
    },
    {
      Key: 'test/album0/photo1.jpg',
      LastModified: '2018-12-17T20:50:12.000Z',
      ETag: '"9f861364e21a577486128e93565a5462"',
      Size: 110333,
      StorageClass: 'STANDARD',
    }],
  Name: 'z.gallery.photos',
  Prefix: 'test/album0',
  MaxKeys: 1000,
  CommonPrefixes: [],
  KeyCount: 3,
};

const albumNotFoundReturnData = {
  IsTruncated: false,
  Contents: [],
  Name: 'zgallery.pictures',
  Prefix: 'test/nonExistingAlbum',
  MaxKeys: 1000,
  CommonPrefixes: [],
  KeyCount: 0,
};

exports.listAlbumsReturnData = listAlbumsReturnData;
exports.listPicturesReturnData = listPicturesReturnData;
exports.albumNotFoundReturnData = albumNotFoundReturnData;
