const router = require('express').Router();
const user = require('./user.js');
const users = require('./users.js');
const auth = require('./auth');
const media = require('./media');
const product = require('./product');
const mercadopago = require("./mercadopago")

router.use('/user', user);
router.use('/users', users);
router.use("/auth", auth);
router.use("/media", media);
router.use("/product", product)
router.use("/mercadopago", mercadopago)

module.exports =  router