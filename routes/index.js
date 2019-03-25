var express = require('express');
var router = express.Router();
var sheets_api = require('../sheets_api');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Crown for Aces Randomizer', songData: sheets_api.songData });
});

module.exports = router;
