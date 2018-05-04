// Load required modules
var express = require('express');
var mongoose = require('mongoose');
var Beer = require('./models/beer');

// Connect to the beerlocker MongoDB
mongoose.connect('mongodb://localhost:27017/beerlocker');

// Create Express application
var app = express();

// Use environment defined port or default 3000
var port = process.env.PORT || 3000;

// Create Express router
var router = express.Router();

// Dummy route for testing
// http://localhost:3000/api
router.get('/', function(req, res) {
  res.json({ message: 'You are running dangerously low on beer!' });
});

// Register all routes with /api
app.use('/api', router);

// Start the server
app.listen(port);
console.log('Insert beer on port', port);
