const morgan = require('morgan');
const express = require('express');
const cookieSession = require('cookie-session');
const passport = require('passport');
const passportSetup = require('../passport')
const server = express();
//bUENAS NOCHES 
const routes = require('./routes/index.js');

server.use((req, res, next)=>{
    const corsList = [
        'http://localhost:3000',
        'http://localhost:3001',
        'http://localhost:3002',
        'https://laruinarecords.cl',
        'https://tv.laruinarecords.cl'
    ];
    if(corsList.includes(req.headers.origin)){   
        res.header('Access-Control-Allow-Origin', (req.headers.origin));
        res.header('Access-Control-Allow-Credentials', 'true');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested, Content-Type, Accept');
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
        next();
        }
    if(req.headers['user-agent'].includes('insomnia')) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Credentials', 'true');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested, Content-Type, Accept');
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
        next();
    } //testing ruteos
});

server.use(
    cookieSession({
        name: "laruina",
        keys: ["asdasd"],
        maxAge: 24*60*60*100
    })
);
server.use(passport.initialize());
server.use(morgan('dev'));
server.use(express.json());
server.use('/', routes);

module.exports = { server }