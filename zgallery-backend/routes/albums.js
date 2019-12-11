const express = require('express');

const router = express.Router();
const awsService = require('../services/aws');


router.get('/albums', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  awsService.getAlbums()
    .then((data) => res.json(data))
    .catch((err) => err);
});

router.get('/albums/:id', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  awsService.getPictures(req.params.id)
    .then((data) => res.json(data))
    .catch((err) => err);
});

module.exports = router;
