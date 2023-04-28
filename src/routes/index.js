const router = require('express').Router();
const user = require('./user.js');
const users = require('./users.js');
//const auth = require('./auth');
const media = require('./media');
const product = require('./product');
const mercadopago = require("./mercadopago")
const playlist = require("./playlist")
const likes = require("./likes")
const yt = require('./yt')
const wogTales = require('./app/wog/tales')
const wogAdventures = require('./app/wog/adventures')

router.use('/user', user);
router.use('/users', users);
//router.use("/auth", auth);
router.use("/media", media);
router.use("/product", product)
router.use("/mercadopago", mercadopago)
router.use("/playlist", playlist)
router.use('/yt', yt)
router.use("/likes", likes)

//World of Gwerh
router.use("/wog/tales", wogTales)
router.use("/wog/adventures", wogAdventures)

module.exports =  router