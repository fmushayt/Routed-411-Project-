var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Welcome to Routed!'});
});

router.get('/test/:source/:dest', function(req, res, next) {
  res.render('test', {source: req.params.source, dest: req.params.dest});
});

router.post('/test/submit', function(req, res, next) {
  var source = req.body.source;
  var dest = req.body.dest;
  res.redirect('/test/' + source + '/' + dest);
});

module.exports = router;
