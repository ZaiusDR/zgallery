let config;

if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
  config = {
    serverUrl: 'localhost:5000',
  }
} else if (process.env.NODE_ENV === 'production') {
  config = {
    serverUrl: 'backend.zgallery.esuarez.info',
  }
}

export const configuration = config;