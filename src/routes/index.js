const { Router } = require('express')
const user = require('./user.js');
const product = require('./product.js');

const router = Router();

router.use('/user', user);

router.use("/product", product)

module.exports = { router }