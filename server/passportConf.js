var contants = require('../constants');
var userController = require('./controllers/userController');
var passport = require('passport');
var LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(new LinkedInStrategy({
    clientID:     contants.LINKEDIN_CLIENT_ID,
    clientSecret: contants.LINKEDIN_CLIENT_SECRET,
    callbackURL:  "http://127.0.0.1:8000/api/auth/linkedin/callback",
    scope:        [ 'r_basicprofile', 'r_emailaddress'],
    passReqToCallback: true
  },
  function(req, accessToken, refreshToken, profile, done) {
    req.session.accessToken = accessToken;
    
    process.nextTick(function () {
      userController
        .findByLinkedInId(profile.id)
        .then(function(user){
          if (user){
            return done(null, user);
          } else {
            userController.create({
              linkedinId: profile.id,
              email: profile._json.emailAddress,
              name: profile.displayName,
              picture: profile._json.pictureUrl,
              publicProfileUrl: profile._json.publicProfileUrl,
              headline: profile._json.headline,
              summary: profile._json.summary,
              location: profile._json.location.name
            })
            .then(function(newUser){
              return done(null, newUser);
            });
          }
        });
    });
  }
));

module.exports = passport;