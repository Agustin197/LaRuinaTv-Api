// require("dotenv").config();
// const morgan = require('morgan');
// const cors = require('cors')
// const express = require('express');
// const server = express();
// const routes = require('./routes/index.js');
// const passport = require('passport');
// const cookieSession = require('cookie-session');
// require('./passport');
  
// server.use(cookieSession({
//     name: 'google-auth-session',
//     keys: ['key1', 'key2'],
//     debug: true
// }));

// server.use(function(request, response, next) {
//     if (request.session && !request.session.regenerate) {
//         request.session.regenerate = (cb) => {
//             cb()
//         }
//     }
//     if (request.session && !request.session.save) {
//         request.session.save = (cb) => {
//             cb()
//         }
//     }
//     next()
// })
// server.use((req, res, next) => {
//     console.log('la sessionnnnnnnn ',req.session);
//     next();
// });

// const corsOptions ={
//     origin:'http://localhost:3000', 
//     credentials:true,          
//     optionSuccessStatus:200
// }
// server.use(cors(corsOptions));

// server.use(express.json())

// server.use(express.urlencoded({extended: true}));

// server.use(passport.initialize());
// server.use(passport.session());
// // server.use((req, res, next)=>{
// //     console.log('request from: ', req.headers.origin)
// //     const corsList = [
// //         'http://localhost:3000',
// //         'http://localhost:3001',
// //         'http://localhost:3002',
// //         'https://laruinarecords.cl',
// //         'https://tv.laruinarecords.cl',
// //         'undefined'
// //     ];
// //     if(corsList.includes(req.headers.origin)){   
// //         res.header('Access-Control-Allow-Origin', (req.headers.origin));
// //         res.header('Access-Control-Allow-Credentials', 'true');
// //         res.header('Access-Control-Allow-Headers', 'Origin, X-Requested, Content-Type, Accept');
// //         res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
// //         next();
// //         }
// //     if(req.headers['user-agent'].includes('insomnia')) {
// //         res.header('Access-Control-Allow-Origin', '*');
// //         res.header('Access-Control-Allow-Credentials', 'true');
// //         res.header('Access-Control-Allow-Headers', 'Origin, X-Requested, Content-Type, Accept');
// //         res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
// //         next();
// //     } //testing ruteos
// // });
// // server.use(cors({ origin: 'http://localhost:3000' }));
// // const corsOptions ={
// //     origin:`http://localhost:3000`, 
// //     credentials:true,            //access-control-allow-credentials:true
// //     optionSuccessStatus:200
// // }
// // server.use(cors(corsOptions));
// // server.use(function(req, res, next) {
// //     res.header("Access-Control-Allow-Origin", "http://localhost:3000");
// //     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
// //     res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
// //     next();
// // });
// //server.use(passport.session());

// // server.use(
// //     cors({
// //         origin: "http://localhost:3000",
// //         methods: 'GET, POST, OPTIONS, PUT, DELETE',
// //         credentials: true
// //     })
// // ) SOLO TESTEO
// // server.use(cookieParser());



// server.use(morgan('dev'));











require("dotenv").config();
const morgan = require('morgan');
const cors = require('cors')
const express = require('express');
const server = express();
const routes = require('./routes/index.js');
const passport = require('passport');
const cookieSession = require('cookie-session');
require('./passport');
  
server.use(cookieSession({
    name: 'google-auth-session',
    keys: ['key1', 'key2'],
    debug: true
}));

server.use(function(request, response, next) {
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

const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,          
    optionSuccessStatus:200
}
server.use(cors(corsOptions));

server.use(express.json())
server.use(express.urlencoded({extended: true}));

server.get('/auth' , passport.authenticate('google', { scope:
    [ 'email', 'profile' ]
}));
  
// Auth Callback
server.get( '/auth/google/callback',
    passport.authenticate( 'google', {
        successRedirect: '/auth/callback/success',
        failureRedirect: '/auth/callback/failure'
}));
  
// Success 
server.get('/auth/callback/success' , (req , res) => {
    if(!req.user){
        res.redirect('/auth/callback/failure');
    }
    req.session.user = req.user
    console.log('la session', req.session)
    res.cookie('googleUser', JSON.stringify(req.user))
    res.redirect("http://localhost:3000");
});
  
// failure
server.get('/auth/callback/failure' , (req , res) => {
    res.send("Error");
})

server.get('/auth/getuser' , (req , res) => {
    if(req.session){
        console.log(req.session)
        console.log(req.cookies)
        console.log(req.session.cookie)
        return res.json(req.session)
    }else{
    // if(req.user){
    //     return res.json(req.user)
    //}else {
        return res.status(401).json({
            error: true,
            message: "Not Authorized"
        })
    }
})
  
server.use('/', routes);

module.exports = server