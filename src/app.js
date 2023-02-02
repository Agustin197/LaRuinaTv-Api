require("dotenv").config();
const morgan = require('morgan');
const cors = require('cors')
const express = require('express');
const cookieParser = require('cookie-parser')
const passport = require('passport');
const server = express();
const session = require('express-session');
const routes = require('./routes/index.js');

server.use(session({ secret: 'dsgasdgsagafdgfgfdg' }));

server.use((req, res, next)=>{
    console.log('request from: ', req.headers.origin)
    const corsList = [
        'http://localhost:3000',
        'http://localhost:3001',
        'http://localhost:3002',
        'https://laruinarecords.cl',
        'https://tv.laruinarecords.cl',
        'https://la-ruina-tv-client.vercel.app'
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
// server.use(cors({ origin: '*' }));
// server.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
//     next();
// });
server.use(passport.initialize());
//server.use(passport.session());

// server.use(
//     cors({
//         origin: "http://localhost:3000",
//         methods: 'GET, POST, OPTIONS, PUT, DELETE',
//         credentials: true
//     })
// ) SOLO TESTEO
server.use(cookieParser());
server.use(express.json())
server.use(express.urlencoded({extended: true}));
// const corsOptions ={
//     origin:'*', 
//     credentials:true,          
//     optionSuccessStatus:200
// }
// server.use(cors(corsOptions));

server.use(morgan('dev'));
server.use('/', routes);

module.exports = server