const { Router } = require("express");
const router = Router();

const {
  uploadFile,
  generatePublicUrl,
  listProductsImages,
  getProductByName,
  listHolis,
} = require("../controllers/media.js");

router.get("/list", async (req, res) => {
  try {
    let response = await listProductsImages();
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
});

router.get("/listHolis", async (req, res) => {
  try {
    let response = await listHolis();
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
});

router.get("/upload", async (req, res) => {
  try {
    let response = await uploadFile();
    console.log(response);
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
});


router.get("/generateUrl", async (req, res) => {
  try {
    let response = await generatePublicUrl(req);
    console.log(response);
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
