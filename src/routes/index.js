const router = require('express').Router();
const user = require('./user.js');
const users = require('./users.js');
//const auth = require('./auth');
const media = require('./media');
const product = require('./product');
const mercadopago = require("./mercadopago")
const playlist = require("./playlist")
const likes = require("./likes")

router.use('/user', user);
router.use('/users', users);
//router.use("/auth", auth);
router.use("/media", media);
router.use("/product", product)
router.use("/mercadopago", mercadopago)
router.use("/playlist", playlist)
//
router.use("/likes", likes)

module.exports =  router