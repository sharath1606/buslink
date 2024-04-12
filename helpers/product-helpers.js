const mongoose = require('mongoose');





const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },

 
});

// Create a model based on the schema
const Product = mongoose.model('productdetails', productSchema);
module.exports = Product;