require("dotenv").config()
const router = require('express').Router();
const passport = require('passport');
const GoogleStrategy = require("passport-google-oauth20").Strategy;

router.use(passport.initialize());

passport.use(
    new GoogleStrategy(
        {
            clientID: '874900879874-6fa06c807bf57v30mp7o376a5rs9tmg5.apps.googleusercontent.com',
            clientSecret: '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',
            callbackURL: `https://la-ruina-api.fly.dev/auth/google/callback`,   
            //scope:["profile", "email"]
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

router.get("/login/success",(req,res)=>{
    console.log(req)
    if(req.user) {
        res.status(200).json({
            error: false,
            message: "Successfully Loged In",
            user: req.user,
        })
    } else {
        res.status(403).json({
            error: true,
            message: "Not Authorized"
        })
    }
})

router.get("/login/failed",(req,res)=>{
    console.log(req)
    res.status(401).json({
        error: true,
        message: "Log in failure"
    })
})

router.get("/google/callback",
    passport.authenticate('google'), /* { failureRedirect: '/login/failed' }), */ (req,res) => {
        if(req.user) {
            res.redirect(`http://localhost:3000`);
        }
        else {
            res.redirect(`http://localhost:3000`);
        }
    }
);

router.get("/google", passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get("/logout", (req,res)=>{
    req.logout();
    res.redirect(process.env.AUTH_CLIENT_URL)
})

module.exports = router;