const passport = require('passport'); //this is the OG passport npm file - nothing to do with the passport.js

module.exports = (app) => {
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email'],
    })
  );

  app.get('/auth/google/callback', passport.authenticate('google'));

   app.get('/api/current_user', (req, res) => { //req = request(incoming), res = response(outgoing)
    res.send(req.user);
   });
};
