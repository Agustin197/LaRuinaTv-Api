const router = require('express').Router();
const user = require('./user.js');
const posts = require('./posts');
const product = require('./product');
const users = require('./users.js');

router.use('/user', user);
router.use('/users', users);
router.use("/product", product)



module.exports =  router