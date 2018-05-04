// Load required modules
var mongoose = require('mongoose');

// Define beer schema
var BeerSchema = new mongoose.Schema({
  name: String,
  type: String,
  quantity: Number
});
// Export Mongoose model
module.exports = mongoose.model('Beer', BeerSchema);
