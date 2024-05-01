const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: String,
  email: String,
  password:String,
});

const userSchema = new mongoose.Schema({
  name:{ type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});


const User =mongoose.model('signup',userSchema );
module.exports = User;