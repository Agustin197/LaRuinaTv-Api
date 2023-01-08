const router = require('express').Router();
const user = require('./user.js');
const auth = require('./auth');
const posts = require('./posts');
const users = require('./users.js');

router.use('/user', user);
router.use("/auth", auth);
router.use("/posts", posts)
router.use('/users', users);


module.exports =  router 