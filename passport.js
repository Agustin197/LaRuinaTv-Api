const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = ("passport");

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENTE_SECRET,
            callbackURL: "/auth/google/callback",
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