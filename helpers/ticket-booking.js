const mongoose = require('mongoose');

// Define schema for the bus ticket
const BusTicketSchema = new mongoose.Schema({
  source: {
    type: String,
    required: true
  },
  destination: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  numberOfPassengers: {
    type: Number,
    required: true,
    min: 1
  },
  bookingDate: {
    type: Date,
    default: Date.now
  }
});

// Create a model for the bus ticket schema
const BusTicket = mongoose.model('BusTicket', BusTicketSchema);

module.exports = BusTicket;
