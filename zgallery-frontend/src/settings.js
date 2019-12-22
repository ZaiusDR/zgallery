let config;

if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
  config = {
    serverUrl: 'localhost:5000',
    mediaServer: 'https://media.esuarez.info/test/',
  }
} else if (process.env.NODE_ENV === 'production') {
  config = {
    serverUrl: 'backend.zgallery.esuarez.info',
    mediaServer: 'https://media.esuarez.info/prod/',
  }
}

export const configuration = config;