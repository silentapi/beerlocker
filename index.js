// Load required modules
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Beer = require('./models/beer');

// Connect to the beerlocker MongoDB
mongoose.connect('mongodb://localhost:27017/beerlocker');

// Create Express application
var app = express();

// Use body-parser module
app.use(bodyParser.urlencoded({
  extended: true
}));

// Use environment defined port or default 3000
var port = process.env.PORT || 3000;

// Create Express router
var router = express.Router();

// Dummy route for testing
// http://localhost:3000/api
router.get('/', function(req, res) {
  res.json({ message: 'You are running dangerously low on beer!' });
});

// Create route for /beers
var beersRoute = router.route('/beers');

// Create endpoint /api/beers for POSTS
beersRoute.post(function(req, res) {
  // Create a new instance of the Beer model
  var beer = new Beer();

  // Set the beer properties from POST data
  beer.name = req.body.name;
  beer.type = req.body.type;
  beer.quantity = req.body.quantity;

  // Save the beer and check for errors
  beer.save(function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'Beer added to the locker!', data: beer });
  });
});

// Register all routes with /api
app.use('/api', router);

// Start the server
app.listen(port);
console.log('Insert beer on port', port);
