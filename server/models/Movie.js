const mongoose = require('mongoose');

// Create Movie Schema
var MovieSchema = new mongoose.Schema({
  title: {
    type: 'string',
    required: true
  },
  url: {
    type: 'string',
    required: true
  }
});

// Export the model Schema
module.exports = MovieSchema;
