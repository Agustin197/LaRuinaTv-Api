const { getFolderFiles, getUrlFileById } = require("../googleapis/index.js");
const { listProductsImages } = require("../../controllers/media");

async function getPostList() {
    const postList = [];
  await listProductsImages().then(async (res) => {
    console.log('el res; ', res)
    
  });
  return postList;
}

module.exports = {
  getPostList,
};
