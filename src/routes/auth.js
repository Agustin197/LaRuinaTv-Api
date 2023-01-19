require("dotenv").config()
const router = require('express').Router();
const passport = require('passport');
const express = require('express')
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const {User} = require('../models/User.js')
const cookieParser = require('cookie-parser')
router.use(cookieParser());
router.use(passport.initialize());


passport.use(
    new GoogleStrategy(
        {
            clientID: '874900879874-6fa06c807bf57v30mp7o376a5rs9tmg5.apps.googleusercontent.com',
            clientSecret: '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',
            callbackURL: `https://la-ruina-api.fly.dev/auth/google/callback`,
            scope: ["profile", "email"]
        },
        async function (accessToken, refreshToken, profile, callback) {
            callback(null, profile);
            
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user)
});

passport.deserializeUser((user, done) => {
    done(null, user)
});

router.get("/login/success", (req, res) => {
    console.log(req)
    if (req.user) {
        res.status(200).json({
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

router.get("/login/failed", (req, res) => {
    console.log(req)
    res.status(401).json({
        error: true,
        message: "Log in failure"
    })
})

router.get("/google/callback",
    passport.authenticate('google'), /* { failureRedirect: '/login/failed' }), */async (req, res) => {
        if (req.user) {
            try {
                let existingUser = await User.findOne({ where: { googleId: req.user.id } });
                if (existingUser) {
                    res.cookie('user', existingUser, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });                    res.redirect(`http://localhost:3000`);
                }
                console.log('Creating new user...');
                const newUser = await User.create({
                    method: 'google',
                    alias: req.user.displayName,
                    email: req.user.emails[0].value,
                    googleId: req.user.id,
                    role: 'free',
                    isVerified: true
                });
                console.log(req.cookies.user)
                res.cookie('user', newUser, { httpOnly: true, secure: false, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });
                res.redirect(`http://localhost:3000`);
            } catch (error) {
                return console.log(error)
            }

        }
        else {
            res.redirect(`http://localhost:3000`);
        }
    }
);

router.get("/getuser", (req, res) => {
     const user = req.cookies.user
    console.log('EL USERRRRRRRRRRRRRRRRRRRRRRRRRR',user)
    res.cookie('user', user)
})

router.get("/google", passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get("/logout", (req, res) => {
    req.logout();
    res.redirect(process.env.AUTH_CLIENT_URL)
})

module.exports = router;