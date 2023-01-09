const { getFolderFiles, getUrlFileById } = require("../googleapis/index.js");
const { listProductsImages } = require("../../controllers/media");

async function getPostList(db, folder1) {
    const postList = [];
  await listProductsImages().then(async (ressss) => {
    
    const folder1Files = await getFolderFiles(folder1).then((res) => {
      return res ? res.reverse() : [""];
    });

    for (let i in db) {
      let post = {
        id: db[i].id,
        urlID: db[i].urlID,
        typeMedia: db[i].typeMedia,
        titulo: db[i].titulo,
        artista: db[i].artista,
        tag: db[i].tag,
        img: folder1Files[i] ? await getUrlFileById(folder1Files[i].id) : "",
        sliderImg: ressss[i] ? ressss[i] : "",
        icon: db[i].icon,
        categoria: db[i].categoria,
        boton1: db[i].boton1,
        info: db[i].info,
      };
      console.log("EL POST: ", post);
      postList.push(post);
    }
    
    
  });
  console.log("LA POSTLIST: ", postList);
  return postList;
}

module.exports = {
  getPostList,
};
