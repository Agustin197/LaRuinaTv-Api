const { Playlist } = require("../models/PlayLists.js")
const { Item } = require("../models/Item.js");
const { getMp3Id } = require("./media.js");
// create playlist
const addPlaylist = async (req, res) => {
    const { playlistName, idUser } = req.body;
    try {
        const newplaylist = await Playlist.create({
            title: playlistName,
            userId: idUser
        })
        return res.status(200).json(newplaylist)
    } catch (error) {
        console.log(error + "error ruta")
    }
}

const addItemToPlaylist = async (req, res) => {
    const { playlistId, connectionId } = req.body;
    console.log('la playlistId', playlistId)
    const audio = await getMp3Id(connectionId)

    const playlist = await Playlist.findOne(
        { where: { id: playlistId } }
    )

    const playlistItem = await Item.create({
        name: audio.appProperties.title,
        artist: audio.appProperties.artist,
        url: audio.id
    })

    playlist.addItem(playlistItem)
    console.log(playlist)

    // const items = await Item.findAll({ where: { playlistId: playlistId } });

    const items = await playlist.getItems()

    console.log('los items de la playlist', items)

    return res.status(200).json(items)
}

// get all playlist
const getAllPlaylist = async (req, res) => {
    const { userId } = req.body
    try {
        let data = await Playlist.findAll({where: {
            userId: userId
        }})
        return res.status(200).json(data)
    } catch (error) {
        console.log(error)
    }
}

// delete playlist by id
const deletePlaylist = async (req, res) => {

    let id = req.params.id
    await Playlist.destroy({ where: { id: id } })
    res.status(200).sed("Playlist is deleted")
}


//get one playlist
// const getOnePlaylist = async (req,res) => {
//     let id = req.params.id
//     let data = await Playlist.findOne({where:{ id: id}})
//     res.status(200).send(data)
// }



module.exports = {
    getAllPlaylist,
    //getOnePlaylist,
    deletePlaylist,
    addItemToPlaylist,
    addPlaylist
}