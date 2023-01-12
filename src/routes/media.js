const { Router } = require("express");
const router = Router();
const fs = require("fs");
const path = require("path");
const os = require("os");
const busboy = require("busboy");
const {
  uploadFile,
  listPostImages,
} = require("../controllers/media.js");

//------ GET ALL IMAGES(SLIDERS & VISOR) -------
const list = []

router.get("/getall", async (req, res) => {
  try {
    list.push(await listPostImages());
    console.log('LA RESPONSE: ', list)
    return res.status(200).json(list);
  } catch (error) {
    console.log(error.message);
  }
});

//----------- UPLOAD IMAGE ---------

const uploadImage = async (mapping, res) => {
  try {
    const response = await uploadFile(
      mapping
    );
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
  }
}

const uploadImageTemp = async (req, res) => {
  var mapping = new Map()
  const bb = busboy({ headers: req.headers });
  bb.on("file", (name, file, info) => {
    const { filename, encoding, mimeType } = info;
    console.log(
      `File [${name}]: filename: %j, encoding: %j, mimeType: %j`,
      filename,
      encoding,
      mimeType
    );
    if(name === 'imageSlider'){
      console.log('image slider: ', filename)
      mapping.set('imageSlider', filename)
      const saveTo = path.join(os.tmpdir(), `slider-image-${filename}`);
      file.pipe(fs.createWriteStream(saveTo));
    }else if(name === 'imageVisor'){
      console.log('image visor: ', filename)
      if(filename === null){
        mapping.set('imageVisor', null)
        return
      }
      mapping.set('imageVisor', filename)
      const saveTo = path.join(os.tmpdir(), `visor-image-${filename}`);
      file.pipe(fs.createWriteStream(saveTo));
    }
  });
  bb.on("field", (name, val) => {
    mapping.set(name, val);
  });
  bb.on("close", () => {
    console.log("Done uploading!");
    uploadImage(mapping, res)
  return 
  });
  req.pipe(bb);
  
}

router.post("/upload", async (req, res) => {
  uploadImageTemp(req, res);
});

module.exports = router;
