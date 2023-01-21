const { Router } = require("express");
const router = Router();
const fs = require("fs");
const path = require("path");
const os = require("os");
const busboy = require("busboy");
const {User} = require("../models/User.js");
const {
  uploadFile,
  listPostImages,
  contentController
} = require("../controllers/media.js");
const sgMail = require('@sendgrid/mail');
const { SENDGRID_API } = process.env;

//------ GET ALL IMAGES(SLIDERS & VISOR) -------

router.get("/getall", async (req, res) => {
  try{
  const responses = await listPostImages();
  console.log(responses)
  Promise.all(await responses?.at(0)).then(response=>{
  return res.status(200).json(response)})
  } catch (error) {
    console.log(error);
    return res.status(400)
  }
})

router.get("/:id", async (req, res) => {
  const {id} = req.params
  console.log('LLA params id', req.params.id, 'TIPO',typeof req.params.id)
  try{
    const responses = await listPostImages();
    Promise.all(await responses.at(0)).then(response=>{
      const resp = response.filter(e => e.id === id)
      return res.status(200).json(resp)})
    } catch (error) {
      console.log(error);
    }
  }
)

////////// LIKE //////////////
//////////// EN DESARROLLO /////////

router.post('/:id/like', contentController.likeContent);

//////////// EN DESARROLLO /////////
////////// LIKE //////////////

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
    console.log("Done uploading!")
    uploadImage(mapping, res)
    sgMail.setApiKey(SENDGRID_API);
    getEmails()
  });
  
  req.pipe(bb);
}
///////////////// CODIGO PARA ENVIAR CORREO (NUEVA MEDIA)///////////////////

async function getEmails() {
  try {
    const usersEmails = await User.findAll({
      attributes: ['email']
    });
    usersEmails.forEach(email => {
      const msgNewPost = {
        to: email,
        from: 'terminalkillerproject@gmail.com',
        subject: 'La Ruina TV ha publicado algo nuevo',
        html: '<p>¡Hola! hemos lanzado una nueva cancion, ven y échale un vistazo: </p>',
      };
    sgMail.send(msgNewPost);
  })
  }catch(e){
    console.log(e)
  };
}

router.post("/upload", async (req, res) => {
  uploadImageTemp(req, res);
});

router.get('/edit/:id', async(req, res) => {
  try {
    const response = await getEditMedia(req)
    return res.status(200).json(response)
  } catch (error) {
    console.log(error)
  }
})

router.get("/search/s", async (req, res) => {
  const {name} = req.query
  console.log('LAAAA REEEEQQQ QUERYYYYYYYYYYYYYYYYYYYY', name)
    try{
      const responses = await listPostImages()
      const resolvedResponses = await Promise.all(responses)
      const flattenResponses = Array.prototype.concat.apply([], resolvedResponses)
      const uniqueResponses = Array.from(new Set(flattenResponses));
      console.log('NEW ARR RESPS: ', uniqueResponses)
      const resp = uniqueResponses.filter(obj => obj.title.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")));
      console.log('el puto resp', resp)
      return res.status(200).json(resp ? resp : 'No existen titulos con ese nombre')
    } catch (error) {
      console.log(error);
    }
  }
)

module.exports = router;
