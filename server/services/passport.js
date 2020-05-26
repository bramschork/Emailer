const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys'); //any file ending in ".js", that ending can be omitted

const user = mongoose.model('users');

passport.serializeUser((user, done) => { //user from OAuth flow then to Google strategy callback
  done(null, user.id);
});

passport.deserializeUser((id, done) => { //user's ID - then done function once ID is turned into a user - turn ID into mongoose user instance - opposite of the above function(passport.serializeUser)
  user.findById(id)
    .then(user => {
      done(null, user)
    });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
    },
    (accessToken, refreshToken, profile, done) => {
      user.findOne({ googleID: profile.id }).then((existingUser) => {
        if (existingUser) {
          //we already have a record with the given profile ID
          done(null ,existingUser);
        } else {
          //we don't have a user with this ID --> make a new record
          new user({ googleID: profile.id })
            .save()
            .then(user => done(null, existingUser));
        }
      });
    }
  )
);
