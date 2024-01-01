const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: {  type: String, required: true,  },

  description: {   type: String,   },
  
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User'  },

  images: {  type: [String], default: [],  },

  audios: {  type: [String], default: [],  },

  chessPGNs: {  type: [String], default: [],  },

  createdAt: {  type: Date,   default: Date.now,  },

});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
