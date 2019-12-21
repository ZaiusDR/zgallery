const express = require('express');
const cors = require('cors');

const router = express.Router();
const awsService = require('../services/aws');
const configuration = require('../settings');


router.get('/albums', cors(configuration.corsConfig), (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  awsService.getAlbums()
    .then((data) => res.json(data))
    .catch((err) => err);
});

router.get('/albums/:id', cors(configuration.corsConfig), (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  awsService.getPictures(req.params.id)
    .then((data) => res.json(data))
    .catch((err) => err);
});

module.exports = router;
