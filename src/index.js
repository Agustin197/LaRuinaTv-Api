const express = require('express');
const morgan = require('morgan');
const server = express();

const user = require('./routes/user.js');

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

server.use(morgan('dev'))
server.use(express.json())
server.use('/user', user)

server.listen(3001, () => console.log(`Server status: Online`))