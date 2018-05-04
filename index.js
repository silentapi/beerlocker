// Load required modules
var express = require('express');

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
