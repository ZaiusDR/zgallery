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

module.exports = router;
