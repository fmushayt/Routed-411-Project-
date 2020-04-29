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

router.get('/api/login', function(request, response) {
  var url = uber.getAuthorizeUrl(['history','profile', 'request', 'places']);
  response.redirect(url);
});

router.get('/api/callback', function(request, response) {
  uber.authorizationAsync({authorization_code: request.query.code})
  .spread(function(access_token, refresh_token, authorizedScopes, tokenExpiration) {
    // store the user id and associated access_token, refresh_token, scopes and token expiration date
    console.log('New access_token retrieved: ' + access_token);
    console.log('... token allows access to scopes: ' + authorizedScopes);
    console.log('... token is valid until: ' + tokenExpiration);
    console.log('... after token expiration, re-authorize using refresh_token: ' + refresh_token);

    // redirect the user back to your actual app
    response.redirect('/web/index.html');
  })
  .error(function(err) {
    console.error(err);
  });
});

router.get('/api/products', function(request, response) {
  // extract the query from the request URL
  var query = url.parse(request.url, true).query;

  // if no query params sent, respond with Bad Request
  if (!query || !query.lat || !query.lng) {
    response.sendStatus(400);
  } else {
    uber.products.getAllForLocationAsync(query.lat, query.lng)
    .then(function(res) {
        response.json(res);
    })
    .error(function(err) {
      console.error(err);
      response.sendStatus(500);
    });
  }
});


module.exports = router;
