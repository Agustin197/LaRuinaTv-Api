const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
  
passport.deserializeUser(function(user, done) {
  done(null, user);
  
});
passport.serializeUser((user, done) => {
  done(null, user);
});
  
passport.use(new GoogleStrategy({
    clientID: '874900879874-6fa06c807bf57v30mp7o376a5rs9tmg5.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: `https://la-ruina-api.fly.dev/auth/laruinatv/google/callback`,
  },
  function(accessToken, refreshToken, profile, done) {
    return done(null, { ...profile, accessToken });
  }
));

module.exports = passport