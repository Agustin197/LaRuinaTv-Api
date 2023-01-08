const router = require('express').Router();
const user = require('./user.js');
const auth = require('./auth');
const posts = require('./posts');


router.use('/user', user);
router.use("/auth", auth);
router.use("/posts", posts)



module.exports =  router 