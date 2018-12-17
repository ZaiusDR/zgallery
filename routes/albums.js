var express = require('express');
var router = express.Router();

var aws = require('../aws/aws');

/* GET users listing. */
router.get('/', function(req, res, next) {
  aws().then((data) => {
    res.json(data);
  }).catch((err) => {
    console.log(err);
  });
});


module.exports = router;
