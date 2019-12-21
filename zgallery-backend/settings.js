let config;

if (process.env.NODE_ENV === 'development') {
  config = {
    corsConfig: {},
    bucketFolder: 'test/',
  };
} else if (process.env.NODE_ENV === 'production') {
  config = {
    corsConfig: { origin: 'http://zgallery.esuarez.info' },
    bucketFolder: 'prod/',
  };
}

module.exports = config;
