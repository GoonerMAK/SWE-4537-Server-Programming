const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const GoogleStrategy = require('passport-google-oauth2').Strategy
const bcrypt = require('bcrypt')
const User = require("./../dataModels/User.model");

function initialize(passport, getUserByEmail, getUserById) {

  const authenticateUser = async (email, password, done) => {

    //Match User
    User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        return done(null, false, {
          message: "This email is not registered!",
        });
      } else {
        //Match Password
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: "Password Incorrect!" });
          }
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
  }

  passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser)) 

  // Google strategy
  passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/BongCloud",
    passReqToCallback: true
  },
  async (request, accessToken, refreshToken, profile, done) => {
    try {
      console.log(profile);

      const existingUser = await User.findOne({ google_id: profile.id });

      if (existingUser) {
        return done(null, existingUser);
      }

      const newUser = new User({
        name: profile.displayName,
        email: profile.emails[0].value,
        google_id: profile.id,
      });

      await newUser.save();
      done(null, newUser);
    } catch(error) {
      console.error(error);
      done(error);
    }
  }));



  passport.serializeUser((user, done) =>{
    done(null, user.id)}) //specify what user data should be stored in the session after a user logs in
  // passport.deserializeUser((id, done) => {  // This function retrieves the user data based on the stored user identifier (e.g., user ID).
  //   return done(null, id)
  // })


  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      console.log(user)
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  });
}

module.exports = initialize