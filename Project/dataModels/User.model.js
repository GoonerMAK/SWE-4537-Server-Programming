const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  
  name: {    type: String,   required: true, },
  
  email: {   type: String,   required: true,   unique: true, },
  
  password: {  type: String,  },
  
  google_id: { type: String,  unique: true, },

  elo_rating: {  type: Number, },
  
  chess_title: {  type: String, },
  
  images: {   type: String,   },

});

const User = mongoose.model("User", UserSchema);

module.exports = User;