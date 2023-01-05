const router = require('express').Router();
const user = require('./user.js');
const auth = require('./auth')

router.use('/user', user);
router.use("/auth", auth)


module.exports =  router 