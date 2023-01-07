const router = require('express').Router();
const user = require('./user.js');
const posts = require('./posts');


router.use('/user', user);
router.use("/posts", posts)

module.exports =  router 