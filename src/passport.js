require("dotenv").config()
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.AUTH_CLIENT_ID,
            clientSecret: process.env.AUTH_CLIENT_SECRET,
            callbackURL: `${process.env.AUTH_CLIENT_URL}auth/google/callback`,   
            scope:["profile", "email"]
        },
        function (accessToken, refreshToken, profile, callback){
            callback(null, profile);
        }
    )
);

passport.serializeUser((user, done)=>{
    done(null, user)
});

passport.deserializeUser((user, done)=>{
    done(null, user)
});

