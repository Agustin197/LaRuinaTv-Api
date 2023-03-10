const express = require("express");
const router = express.Router();
const ytController = require('../controllers/yt')

router.post('/subscription', ytController.isUserSubscribed)

module.exports = router