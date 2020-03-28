let config;

if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
  config = {
    serverUrl: 'http://localhost:5000',
    mediaServer: 'https://media.esuarez.info/test/',
    maxThumbnails: 2,
  }
} else if (process.env.NODE_ENV === 'production') {
  config = {
    serverUrl: 'https://backend.zgallery.esuarez.info',
    mediaServer: 'https://media.esuarez.info/prod/',
    maxThumbnails: 10,
  }
}

export const configuration = config;