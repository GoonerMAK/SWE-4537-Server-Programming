const User = require("../dataModels/User.model");
const fs = require("fs");
const path = require("path");
const Post = require("../dataModels/Post.model");


const postProfileImage = async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'No file provided' });
      }
      
      const photo = req.file.filename
      
      const userId = req.user.id
      const user = await User.findById(userId);
      console.log(user)
  
  
      if (photo) {
        user.profile_image = photo
      }
      await user.save();
  
      res.json({ message: 'Profile image updated successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  
  const postMultipleImages = async (req, res) => {
    try {
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ message: 'No file provided' });
      }
  
      const userId = req.user.id;
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      const newImages  = req.files.map((file) => file.filename);
     
      user.images = user.images.concat(newImages);
  
      await user.save();
  
      res.json({ message: 'Multiple images updated/appended successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  
  const getMultipleImages = async (req, res) => {
    try {
      const userId = req.user.id
      const user = await User.findById(userId);
      const images= user.images
  
      res.json({ images });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  
  const postAudioFile = async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'No file provided' });
      }
      
      const audio = req.file.filename
      
      const userId = req.user.id
      const user = await User.findById(userId);
      console.log(user)
  
  
      if (audio) {
        user.audio.push(audio);     // Append
      }
      
      await user.save();
  
      res.json({ message: 'Audio updated successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

  const postPgnFile = async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'No file provided' });
      }
  
      const pgnFilePath = req.file.path;
      const pgnFileContent = fs.readFileSync(pgnFilePath, 'utf-8');
      const base64EncodedPgn = Buffer.from(pgnFileContent).toString('base64');
  
      // Implementation needed
  
      res.json({ message: 'PGN file processed successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  
module.exports = {
    postProfileImage,
    postMultipleImages,
    getMultipleImages,
    postAudioFile, 
    postPgnFile,
  };
  