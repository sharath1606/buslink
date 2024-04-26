const mongoose = require('mongoose');

const busSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    latitude: {
      type: Number,
      required: true
    },
    longitude: {
      type: Number,
      required: true
    },
    route: {
      type: String,
      required: true
    },
    // You can add more properties as needed
  });
  
  // Create a model based on the schema
  const Bus = mongoose.model('Bus', busSchema);
  
  // Export the model
  module.exports = Bus;