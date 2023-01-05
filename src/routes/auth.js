require("dotenv").config()

const router = require('express').Router();
const passport = require('passport');

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

router.get(
    "google/callback",
    passport.authenticate('google', {
        succesRedirect: process.env.CLIENT_URL,
        failureRedirect: "login/failed"
    })
);

router.get("/google", passport.authenticate("google", ["profile", "email"]))

router.get("/logout", (req,res)=>{
    req.logout();
    res.redirect(process.env.CLIENT_URL)
})

module.exports = router;