const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.json({ Status: 'OK' });
});

module.exports = router;
