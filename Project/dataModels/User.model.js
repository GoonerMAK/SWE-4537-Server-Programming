const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  
  name: {    type: String,   required: true, },
  
  email: {   type: String,   required: true,   unique: true, },
  
  password: {  type: String,  },
  
  google_id: { type: String,  unique: true, },

  elo_rating: {  type: String, },
  
  chess_title: {   type: String, },
  
  profile_image: { type: String, default:'',   },

});

const User = mongoose.model("User", UserSchema);

module.exports = User;