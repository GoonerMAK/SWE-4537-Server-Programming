const path = require("path");
const bcrypt = require("bcrypt");
const passport = require("passport");
const initializePassport = require("../config/passport");
const fs = require('fs');   // To read and write JSON files

const usersFilePath = path.join(__dirname, '..', 'data', 'user-data.json');
const users = JSON.parse(fs.readFileSync(usersFilePath , 'utf-8'));

// const users = []; // store the user info here

initializePassport(
  passport,
  email => users.find(user => user.email === email),
  id => users.find(user => user.id === id)
  );

const getLogin = async (req, res) => {
  const filePath = path.join(__dirname, "..", "views", "login.html");
  res.sendFile(filePath);
};

const postLogin = (req, res, next) => {

  passport.authenticate("local", {
    successRedirect: "/welcome",
    failureRedirect: "/login",
    failureFlash: true,
  })(req, res, next);
};


const getRegister = async (req, res) => {
  const filePath = path.join(__dirname, "..", "views", "register.html");
  res.sendFile(filePath);
};


const postRegister = async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);  // req.body.password ==> password should be exact match to register.html name=password,  10:how many time you want to generate hash. it's a standard default value
    const newUser = {
      id: Date.now().toString(),
      name: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    };

    users.push(newUser);
    
    const usersFilePath = path.join(__dirname, '..', 'data', 'user-data.json');
    
    // Write the updated user data back to the JSON file
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));

    console.log('User registered successfully:', newUser);

    res.redirect('/login');
  } catch {
    res.redirect('/register');
  }

  console.log('The List:');
  console.log(users); // show the user list

};

module.exports = {
  getLogin,
  getRegister,
  postLogin,
  postRegister,
};
