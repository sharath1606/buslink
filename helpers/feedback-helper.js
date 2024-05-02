// Import Mongoose
const mongoose = require('mongoose');

// Define a schema for feedback
const feedbackSchema = new mongoose.Schema({
  feedback: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create a model using the schema
const Feedback = mongoose.model('Feedback', feedbackSchema);

// Export the model
module.exports = Feedback;
