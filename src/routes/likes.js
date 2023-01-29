const router = require("express").Router();
const likes = require("../controllers/likes.js")


router.post("/add", likes.addLike )

router.post("/getAll", likes.getAllLikes)

module.exports = router