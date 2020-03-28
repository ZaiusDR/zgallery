let config;

if (process.env.NODE_ENV === 'development') {
  config = {
    corsConfig: {},
    bucketFolder: 'test/',
    serverUrl: 'http://localhost:3000',
  };
} else if (process.env.NODE_ENV === 'production') {
  config = {
    corsConfig: { origin: 'https://zgallery.esuarez.info' },
    bucketFolder: 'prod/',
    serverUrl: 'https://backend.zgallery.esuarez.info',
  };
}

module.exports = config;
