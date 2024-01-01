const User = require("../dataModels/User.model");
const Post = require("../dataModels/Post.model");
const path = require('path')
const fs = require('fs');
const { Console } = require("console");
const mongoose = require('mongoose');



const getCreatePostPage = async (req, res) => {
    try {
        const filePath = path.join(__dirname, '..', 'views', 'createPost.html');
        
        // Check if the file exists
        if (fs.existsSync(filePath)) {
            res.sendFile(filePath);
        } else {
            res.status(404).json({ error: 'HTML file not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


// Create a new post
const createPost = async (req, res) => {
    const { title, description, images, audios, chessPGNs } = req.body;
  
    try {
      const newPost = new Post({
        title,
        description,
        user_id: req.user._id,
        images,
        audios,
        chessPGNs,
      });
  
      const savedPost = await newPost.save();
      res.status(201).json({ message: "Post created successfully", post: savedPost });
    } catch (error) {
        res.status(400).json({ error: error.message, message: "Failed to create post" });
    }
};



// Get all posts
const getAllPosts = async (req, res) => {
    try {
      const posts = await Post.find().sort({ createdAt: -1 });
      res.json(posts);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};
  

// Get a single post by ID
const getPostById = async (req, res) => {
    const { postID } = req.params;
    
    try {
        console.log('Received post ID:', postID);
        const post = await Post.findById(postID);

        if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }
      res.json(post);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};
  

  
// Update a post by ID
const updatePost = async (req, res) => {
    const { title, description, images,  audios, chessPGNs } = req.body;
    const { postID } = req.params;

    try {
      const updatedPost = await Post.findByIdAndUpdate(
        postID,
        {
          title,
          description,
          images,
          audios,
          chessPGNs,
        },
        { new: true }
      );
  
      if (!updatedPost) {
        return res.status(404).json({ error: "Post not found" });
      }
  
      res.status(201).json({ message: "Post Updated successfully", post: updatedPost });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
};
  

// Delete a post by ID
const deletePost = async (req, res) => {
    const { postID } = req.params;

    try {
      const deletedPost = await Post.findByIdAndDelete(postID);
  
      if (!deletedPost) {
        return res.status(404).json({ error: "Post not found" });
      }
  
      res.json({ message: "Post deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};
  
  
const appendImagesToPost = async (req, res) => {
    const { postID } = req.params;
    const { files } = req;
    const authenticatedUser = req.user;
  
    console.log('Received post ID:', postID);
    const post = await Post.findById(postID);
    console.log('Retrieved post:', post);

    if (!mongoose.Types.ObjectId.isValid(postID)) {
        return res.status(400).json({ error: 'Invalid post ID' });
    }

    try 
    {
        const post = await Post.findById(postID);

        if (!post) {
            console.log('Post not found');
            return res.status(404).json({ error: 'Post not found' });
        }

      if (post.user_id.toString() !== authenticatedUser._id.toString()) {
        return res.status(403).json({ error: 'You do not have permission to update this post' });
      }
  
      // Append the new images to the existing images array
      post.images = post.images.concat(files.map((file) => file.filename));
  
      await post.save();
  
      res.json({ message: "Images appended to the post successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};

  
const appendAudiosToPost = async (req, res) => {
    const { postID } = req.params;
    const { files } = req;
    const authenticatedUser = req.user;
  
    try {
      const post = await Post.findById(postID);
  
      if (!post) {
        throw new Error("post not found");
      }
  
      if (post.user_id.toString() !== authenticatedUser._id.toString()) {
        return res.status(403).json({ error: 'You do not have permission to update this post' });
      }
  
      // Append the new audio files to the existing audio array
      post.audios = post.audios.concat(files.map((file) => file.filename));
  
      await post.save();
  
      res.json({ message: "Audio files appended to the post successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


module.exports = {
    getCreatePostPage,
    getAllPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost,
    appendImagesToPost,
    appendAudiosToPost,
};