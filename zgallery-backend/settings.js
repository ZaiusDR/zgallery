let config;

if (process.env.NODE_ENV === 'development') {
  config = {
    corsConfig: {},
  };
} else if (process.env.NODE_ENV === 'production') {
  config = {
    corsConfig: { origin: 'http://zgallery.esuarez.info' },
  };
}

module.exports = config;
