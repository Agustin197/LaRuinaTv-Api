const router = require('express').Router();
const user = require('./user.js');
const users = require('./users.js');
const auth = require('./auth');
const posts = require('./posts');
const media = require('./media');

router.use('/user', user);
router.use('/users', users);
router.use("/auth", auth);
router.use("/posts", posts)
router.use("/media", media);

module.exports =  router 