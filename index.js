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

// Create endpoint on /api/beers for POST
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

// Create endpoint on /api/beers for GET
beersRoute.get(function(req, res) {
  // Use the Beer model to find all beer
  Beer.find(function(err, beers) {
    if (err)
      res.send(err);

    res.json(beers);
  });
});

// Create froute for /beers/:beer_id
var beerRoute = router.route('/beers/:beer_id');

// Create endpoint on /api/beers/:beer_id for GET
beerRoute.get(function(req, res) {
  // Use the Beer model to find a specific beer
  Beer.findById(req.params.beer_id, function(err, beer) {
    if (err)
      res.send(err);

    res.json(beer);
  });
});

// Create endpoint on /api/beers/:beer_id for PUT
beerRoute.put(function(req, res) {
  // Use the Beer model to find a specific beer
  Beer.findById(req.params.beer_id, function(err, beer) {
    if (err)
      res.send(err);

    // Update the existing beer quantity
    beer.quantity = req.body.quantity;

    // Save the beer and check for errors
    beer.save(function(err) {
      if (err)
        res.send(err);

      res.json(beer);
    });
  });
});

// Create endpoint on /api/beers/:beer_id for DELETE
beerRoute.delete(function(req, res) {
  // Use the Beer model to find a specific beer and remove it
  Beer.findByIdAndRemove(req.params.beer_id, function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'Beer removed from the locker!' });
  });
});

// Register all routes with /api
app.use('/api', router);

// Start the server
app.listen(port);
console.log('Insert beer on port', port);
