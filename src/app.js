require("dotenv").config();
const morgan = require('morgan');
const cors = require('cors')
const express = require('express');
const server = express();
const routes = require('./routes/index.js');
const passport = require('passport');
const cookieSession = require('cookie-session');
require('./passport');
const { User } = require('./models/User');

server.use(cookieSession({
    name: 'google-auth-session',
    keys: ['key1', 'key2'],
    debug: true
}));

server.use(function (request, response, next) {
    if (request.session && !request.session.regenerate) {
        request.session.regenerate = (cb) => {
            cb()
        }
    }
    if (request.session && !request.session.save) {
        request.session.save = (cb) => {
            cb()
        }
    }
    next()
})
server.use(passport.initialize());
server.use(passport.session());

server.use((req, res, next)=>{
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Credentials', 'true');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested, Content-Type, Accept');
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
        next();
    //testing ruteos
    //const HOST_URL = req.headers.referer.slice(0, -1)
    //console.log('request from: ', HOST_URL)
//     const corsList = [
//         'http://localhost:3000',
//         'http://localhost:3001',
//         'http://localhost:3002',
//         'https://laruinarecords.cl',
//         'https://tv.laruinarecords.cl',
//         'https://merch.laruinarecords.cl',
//         'https://la-ruina-tv-client.vercel.app',
//         'https://accounts.google.com',
//         'http://192.168.0.8:3000'
//     ];
//     if(corsList.includes(HOST_URL)){   
//         res.header('Access-Control-Allow-Origin', (HOST_URL));
//         res.header('Access-Control-Allow-Credentials', 'true');
//         res.header('Access-Control-Allow-Headers', 'Origin, X-Requested, Content-Type, Accept');
//         res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
//         next();
//         }
});

server.use(express.json())
server.use(express.urlencoded({ extended: true }));

server.get('/auth', passport.authenticate('google', {
    scope: [
            'email',
            'profile', 
            'https://www.googleapis.com/auth/userinfo.email', 
            'https://www.googleapis.com/auth/userinfo.profile', 
            'https://www.googleapis.com/auth/plus.me'
        ],
        accessType: 'offline'
}));

// Auth Callback
server.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: `/auth/laruina/tv/callback/success`,
        failureRedirect: '/auth/callback/failure'
    })
);

// Success 
server.get('/auth/laruina/tv/callback/success', async (req, res) => {
    const referer = 'https://tv.laruinarecords.cl';

    console.log('LA URL: ', req.query)
    if (!req.user) {
        res.redirect(`${referer}/auth/callback/failure`);
    }
    const accessToken = req.user.accessToken;
    const existingUser = await User.findOne({
        where: {
            email: req.user.emails[0].value,
        }
    });
    
    if (existingUser) {
        await User.update(
            { token: req.user.accessToken },
            { where: { email: req.user.emails[0].value, } }
        )
        return res.redirect(`${referer}/auth?token=${accessToken}`)
    }
    await User.create({
        alias: req.user.name.givenName,
        email: req.user.emails[0].value,
        googleId: req.user.id,
        method: 'google',
        isVerified: true,
        token: req.user.accessToken,
        role: req.user.emails[0].value === 'valearellano14@gmail.com' || req.user.emails[0].value ===  'terminalkillerproject@gmail.com' ||req.user.emails[0].value === 'lalofreak.jsx@gmail.com' || req.user.emails[0].value === 'lalofreak.dev@gmail.com' ? JSON.stringify({ role: 'admin', userMode: 'admin' }) : JSON.stringify({ role: 'common_user', userMode: 'free' }),
        googlePic: req.user.photos[0].value,
    });
    return res.redirect(`${referer}/auth?token=${accessToken}`)
});


// failure
server.get('/auth/callback/failure', (req, res) => {
    res.send("Error");
})

server.use('/', routes);


module.exports = server