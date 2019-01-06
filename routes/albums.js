var express = require('express');
var router = express.Router();

var aws = require('../aws/aws');

/* GET albums listing. */
router.get('/', function(req, res, next) {
  aws.getAlbums().then((data) => {
    res.json(data);
  }).catch((err) => {
    console.log(err);
  });
});

/* GET picture listing in an album. */
router.get('/:id', function(req, res, next) {
  aws.getPictures(req.params.id).then((data) => {
    res.json(data);
  }).catch((err) => {
    console.log(err);
  });
});

/* POST a new Album */
router.post('/', function(req, res, next) {
  aws.getAlbums(req.body.name).then((data) => {
    if (data.includes(req.body.name)) {
      res.status(400);
      res.send(`Album ${req.body.name} already exists.`);
    } else {
      aws.createAlbum(req.body.name).then((data) => {
        res.status(201);
        res.send(`Successfully created album: ${req.body.name} ${JSON.stringify(data)}`);
      }).catch((err) => {
        console.log(err);
      });
    }
  }).catch((err) => {
    console.log(err);
  });
});

/* DELETE an Album */
router.delete('/:id', function(req, res, next) {
  aws.getAlbums(req.params.id).then((data) => {
    if (!data.includes(req.params.id)) {
      res.status(400);
      res.send(`Album ${req.params.id} does not exist.`);
    } else {
      aws.deleteAlbum(req.params.id).then((data) => {
        res.status(200);
        res.send(`Album ${req.params.id} successfully deleted.`);
      }).catch((err) => {
        console.log(err);
      });
    }
  }).catch((err) => {
    console.log(err);
  });
});


module.exports = router;
