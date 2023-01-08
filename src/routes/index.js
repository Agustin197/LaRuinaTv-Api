const router = require('express').Router();
const user = require('./user.js');
const posts = require('./posts');
const product = require('./product');

router.use('/user', user);

router.use("/product", product)



module.exports =  router