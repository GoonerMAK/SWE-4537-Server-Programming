const User = require("../dataModels/User.model");
const path = require("path");
const fs = require("fs");



const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: error.message });
  }
};


const getUserById = async (req, res) => {
    const { userID } = req.params;

  try {
    console.log('Received user ID:', userID);
    const user = await User.findById(userID);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: error.message });
  }
};



const updateUserById = async (req, res) => {
    const { userID } = req.params;

  try {
    const updatedUser = await User.findByIdAndUpdate(userID, req.body, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: error.message });
  }
};



const deleteUserById = async (req, res) => {
    const { userID } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(userID);

    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(deletedUser);
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: error.message });
  }
};


const appendProfilePicture = async (req, res) => {
  const { userID } = req.params;
  const { files } = req;
  const authenticatedUser = req.user;

  try {
    const user = await User.findById(userID);

    if (!user) {
        throw new Error("User not found");
    }
  
    if (userID.toString() !== authenticatedUser._id.toString()) {
      return res.status(403).json({ error: 'You do not have permission to update this user' });
    }

    user.images = files.length > 0 ? files[0].filename : null;
    
    const updatedUser = await user.save();

    res.json({ message: "Profile picture appended to the user successfully", user: updatedUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const currentUser = async (req, res) => {

    const authenticatedUser = req.user;
    try {
      if (!req.user) {
        return res.status(401).json({ error: 'User not authenticated' });
      }

      const name = authenticatedUser.name;
      console.log(name);

      res.status(200).json(name);
    } catch (error) {
      console.error('Error fetching current user:', error);
      res.status(500).json({ error2: error.message });
    }
  };


module.exports = {
    updateUserById,
    deleteUserById,
    getUsers,
    getUserById,
    appendProfilePicture,
    currentUser,
};