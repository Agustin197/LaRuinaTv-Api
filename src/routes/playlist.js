const router = require("express").Router();
const playlist = require("../controllers/playlist.js")


router.post("/create", playlist.addPlaylist)

router.post("/all", playlist.getAllPlaylist)

router.delete("/delete/:id", playlist.deletePlaylist)

router.post("/add", playlist.addItemToPlaylist)


// router.get("/:idList/additem/:idItem", playlistController.addItemPlaylist) => agregar items a una lista




// •GET /playlist/all (envía todas las playlist del usuario)
// •POST /playlist/create
// •POST /playlist/delete/:idPlaylist
// •POST /playlist/:idPlaylist/additem/idItem
// •POST /playlist/:idPlaylist/deleteitem/:idItem 

module.exports = router