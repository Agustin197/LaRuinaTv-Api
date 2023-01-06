const { getFolderFiles, getUrlFileById } = require('../googleapis/index.js');

async function getPostList(db,folder1,folder2){
    const postList = []
    const folder1Files = await getFolderFiles(folder1).then(res=> {return res? res.reverse(): ['']})
    const folder2Files = await getFolderFiles(folder2).then(res=> {return res? res.reverse(): ['']})

    for(let i in db){
        let post = {
            id: db[i].id,
            urlID: db[i].urlID,
            typeMedia: db[i].typeMedia,
            titulo: db[i].titulo,
            artista: db[i].artista,
            tag: db[i].tag,
            img: folder1Files[i]? await getUrlFileById(folder1Files[i].id) : '',
            sliderImg: folder2Files[i]? await getUrlFileById(folder2Files[i].id) : '',
            icon: db[i].icon,
            categoria:db[i].categoria,
            boton1:db[i].boton1,
            info: db[i].info
        }
        postList.push(post)
    }
    return postList
}

module.exports = {
    getPostList

}