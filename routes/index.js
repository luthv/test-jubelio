var express = require('express');
var router = express.Router();

var jubelio = require('../queries.js');
var azure = require('azure-storage');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Test Jubelio' });
});

router.post('/api/tenant-companies', jubelio.testUpload);

module.exports = router;
