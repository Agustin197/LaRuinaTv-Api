const router = require('express').Router();
const user = require('./user.js');
const users = require('./users.js');
const auth = require('./auth');
const posts = require('./posts');
<<<<<<< HEAD
const users = require('./users.js');
=======
const product = require('./product');

>>>>>>> f6639827d1144eac8da29c3a53c53f4a82d54a27

router.use('/user', user);
router.use('/users', users);
router.use("/auth", auth);
<<<<<<< HEAD
router.use("/posts", posts)
router.use('/users', users);
=======
router.use("/posts", posts);
router.use("/product", product);

>>>>>>> f6639827d1144eac8da29c3a53c53f4a82d54a27


module.exports =  router 