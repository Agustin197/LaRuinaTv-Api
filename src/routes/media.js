const { Router } = require("express");
const router = Router();
const fs = require("fs");
const path = require("path");
const os = require("os");
const busboy = require("busboy");
const { User } = require("../models/User.js");
const {
  uploadFile,
  listPostImages,
  contentController,
  getEditMedia,
  listPostVisorImages,
  updateImageAndMeta
} = require("../controllers/media.js");
const sgMail = require('@sendgrid/mail');
const { SENDGRID_API } = process.env;

//------ GET ALL IMAGES(SLIDERS & VISOR) -------

router.get("/getall", async (req, res) => {
  // try{
  // const responses = await listPostImages();
  // console.log(responses)
  // Promise.all(await responses?.at(0)).then(response=>{
  // return res.status(200).json(response)})
  // } catch (error) {
  //   console.log(error);
  //   return res.status(400)
  // }

  try {
    //slider
    const responsesSlider = await listPostImages()
    const resolvedResponsesSlider = await Promise.all(responsesSlider)
    const flattenResponsesSlider = Array.prototype.concat.apply([], resolvedResponsesSlider)
    const uniqueResponsesSlider = Array.from(new Set(flattenResponsesSlider));
    //visor
    const responsesVisor = await listPostVisorImages()
    const resolvedResponsesVisor = await Promise.all(responsesVisor)
    const flattenResponsesVisor = Array.prototype.concat.apply([], resolvedResponsesVisor)
    const uniqueResponsesVisor = Array.from(new Set(flattenResponsesVisor));
    return res.status(200).json({ slider: uniqueResponsesSlider, visor: uniqueResponsesVisor })
  } catch (error) {
    console.log(error)
  }
})

router.get("/:id", async (req, res) => {
  const { id } = req.params
  // try{
  //   const responses = await listPostImages();
  //   Promise.all(await responses.at(0)).then(response=>{
  //     const resp = response.filter(e => e.id === id)
  //     return res.status(200).json(resp)})
  // } catch (error) {
  //     console.log(error);
  // }
  try {
    const responses = await listPostImages()
    const resolvedResponses = await Promise.all(responses)
    const flattenResponses = Array.prototype.concat.apply([], resolvedResponses)
    const uniqueResponses = Array.from(new Set(flattenResponses));
    const resp = uniqueResponses.filter(obj => obj.id === id)
    return res.status(200).json(resp)
  } catch (error) {
    console.log(error)
  }
})

////////// LIKE //////////////


router.post('/:id/like', contentController.likeContent);


//////////////////////////////

//----------- UPLOAD IMAGE ---------

const uploadImage = async (mapping, mappingImages, mappingFiles, res) => {
  try {
    if (mappingImages.get('imageSlider') === null) {
      mappingImages.delete('imageSlider')
    }
    if (mappingImages.get('imageVisor') === null) {
      mappingImages.delete('imageVisor')
    }
    if (mappingFiles.get('audioFile') === null) {
      mappingFiles.delete('audioFile')
    }
    if (mappingFiles.get('videoFile') === null) {
      mappingFiles.delete('videoFile')
    }
    const response = await uploadFile(mapping, mappingImages, mappingFiles);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
  }
}

const uploadImageTemp = async (req, res) => {
  var mapping = new Map()
  var mappingImages = new Map()
  var mappingFiles = new Map()

  const bb = busboy({ headers: req.headers });

  // bb.on("file", (name, file, info) => {
  //   const { filename, encoding, mimeType } = info;
  //   console.log(
  //     `File [${name}]: filename: %j, encoding: %j, mimeType: %j`,
  //     filename,
  //     encoding,
  //     mimeType
  //   );
  //   if(name === 'imageSlider'){
  //     console.log('image slider: ', filename)
  //     mapping.set('imageSlider', filename)
  //     const saveTo = path.join(os.tmpdir(), `slider-image-${filename}`);
  //     file.pipe(fs.createWriteStream(saveTo));
  //   }else if(name === 'imageVisor'){
  //     console.log('image visor: ', filename)
  //     if(filename === null){
  //       mapping.set('imageVisor', null)
  //       return
  //     }
  //     mapping.set('imageVisor', filename)
  //     const saveTo = path.join(os.tmpdir(), `visor-image-${filename}`);
  //     file.pipe(fs.createWriteStream(saveTo));
  //   }
  // });
  bb.on("file", (fieldName, file, info) => {
    if (file) {
      if (fieldName === "imageSlider") {
        console.log("image slider: ", info.filename);
        mappingImages.set("imageSlider", info.filename);
        const saveTo = path.join(os.tmpdir(), `slider-image-${info.filename}`);
        file.pipe(fs.createWriteStream(saveTo));
      } else if (fieldName === "imageVisor") {
        console.log("image visor: ", info.filename);
        mappingImages.set("imageVisor", info.filename);
        const saveTo = path.join(os.tmpdir(), `visor-image-${info.filename}`);
        file.pipe(fs.createWriteStream(saveTo));
      } else if (fieldName === "audioFile") {
        console.log("audio file: ", info.filename);
        mappingFiles.set("audioFile", info.filename);
        const saveTo = path.join(os.tmpdir(), `audio-file-${info.filename}`);
        file.pipe(fs.createWriteStream(saveTo));
      } else if (fieldName === "videoFile") {
        console.log("video file: ", info.filename);
        mappingFiles.set("videoFile", info.filename);
        const saveTo = path.join(os.tmpdir(), `video-file-${info.filename}`);
        file.pipe(fs.createWriteStream(saveTo));
      }
    } else if (fieldName === 'imageSlider') {
      console.log("No image slider being uploaded.");
      mappingImages.set("imageSlider", null);
    } else if (fieldName === 'imageVisor') {
      console.log("No image visor being uploaded.");
      mappingImages.set("imageVisor", null);
    } else if (fieldName === 'audioFile') {
      console.log("No audio file being uploaded.");
      mappingFiles.set("audioFile", null);
    } else if (fieldName === 'videoFile') {
      console.log("No video file being uploaded.");
      mappingFiles.set("videoFile", null);
    }
  });

  bb.on("field", (name, val) => {
    console.log(name, val)
    mapping.set(name, val);
  });
  bb.on("close", () => {
    console.log("Done uploading!")
    uploadImage(mapping, mappingImages, mappingFiles, res)
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
  } catch (e) {
    console.log(e)
  };
}

router.post("/upload", async (req, res) => {
  uploadImageTemp(req, res);
});

router.get('/edit/:id', async (req, res) => {
  try {
    const response = await getEditMedia(req)
    return res.status(200).json(response)
  } catch (error) {
    console.log(error)
  }
})

// const updateImage = async (mapping, res) => {
//   try {
//     const response = await updateImageAndMeta(
//       mapping
//     );
//     return res.status(200).json(response);
//   } catch (error) {
//     console.log(error);
//   }
// }

// const UpdateImageMeta = async (req, res) => {
//   var mapping = new Map()
//   const bb = busboy({ headers: req.headers });
//   bb.on("file", (name, file, info) => {
//     if(file){
//       const { filename, encoding, mimeType } = info;

//       console.log(
//         `File [${name}]: filename: %j, encoding: %j, mimeType: %j`,
//         filename,
//         encoding,
//         mimeType
//       );
//       if(name === 'imageSlider'){
//         console.log('image slider: ', filename)
//         mapping.set('imageSlider', filename)
//         const saveTo = path.join(os.tmpdir(), `slider-image-${filename}`);
//         file.pipe(fs.createWriteStream(saveTo));
//       }else if(name === 'imageVisor'){
//         console.log('image visor: ', filename)
//         if(filename === null){
//           mapping.set('imageVisor', null)
//           return
//         }
//         mapping.set('imageVisor', filename)
//         const saveTo = path.join(os.tmpdir(), `visor-image-${filename}`);
//         file.pipe(fs.createWriteStream(saveTo));
//       }
//     }else{
//       mapping.set('imageVisor', 'same')
//       mapping.set('imageSlider', 'same')
//     }
//   });
//   bb.on("field", (name, val) => {
//       mapping.set(name, val)
//   });
//   bb.on("close", () => {
//     console.log("Done uploading!")
//     updateImage(mapping, res)
//   });

//   req.pipe(bb);
// }

const updateImage = async (mapping, mappingImages, mappingFiles, res) => {

  try {
    const response = await updateImageAndMeta(mapping, mappingImages, mappingFiles);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
  }
};

const updateImageMeta = async (req, res) => {
  var mapping = new Map();
  var mappingImages = new Map();
  var mappingFiles = new Map();
  const bb = busboy({ headers: req.headers });

  bb.on("file", (name, file, info) => {
    if (file) {
      if (name === "imageSlider") {
        console.log("image slider: ", info.filename);
        mappingImages.set("imageSlider", info.filename);
        const saveTo = path.join(os.tmpdir(), `slider-image-${info.filename}`);
        file.pipe(fs.createWriteStream(saveTo));
      } else if (name === "imageVisor") {
        console.log("image visor: ", info.filename);
        mappingImages.set("imageVisor", info.filename);
        const saveTo = path.join(os.tmpdir(), `visor-image-${info.filename}`);
        file.pipe(fs.createWriteStream(saveTo));
      } else if (name === "audioFile") {
        console.log("audio file: ", info.filename);
        mappingFiles.set("audioFile", info.filename);
        const saveTo = path.join(os.tmpdir(), `audio-file-${info.filename}`);
        file.pipe(fs.createWriteStream(saveTo));
      } else if (name === "videoFile") {
        console.log("video file: ", info.filename);
        mappingFiles.set("videoFile", info.filename);
        const saveTo = path.join(os.tmpdir(), `video-file-${info.filename}`);
        file.pipe(fs.createWriteStream(saveTo));
      }
    } else if (name === 'imageSlider') {
      console.log("No image slider being uploaded.");
      mappingImages.set("imageSlider", "same");
    } else if (name === 'imageVisor') {
      console.log("No image visor being uploaded.");
      mappingImages.set("imageVisor", "same");
    } else if (name === 'audioFile') {
      console.log("No audio file being uploaded.");
      mappingFiles.set("audioFile", "same");
    } else if (name === 'videoFile') {
      console.log("No video file being uploaded.");
      mappingFiles.set("videoFile", null);
    }
  });

  bb.on("field", (name, val) => {
    if (val === "" || val) {
      mapping.set(name, val);
    }
  });
  bb.on("close", () => {
    console.log("Done uploading!");
    updateImage(mapping, mappingImages, mappingFiles, res);
  });

  req.pipe(bb);
};

router.post('/edit', async (req, res) => {
  updateImageMeta(req, res)
})

router.get("/search/s", async (req, res) => {
  const { name } = req.query
  if (!name) return res.end()
  console.log('LAAAA REEEEQQQ QUERYYYYYYYYYYYYYYYYYYYY', name)
  try {
    const responses = await listPostImages()
    const resolvedResponses = await Promise.all(responses)
    const flattenResponses = Array.prototype.concat.apply([], resolvedResponses)
    const uniqueResponses = Array.from(new Set(flattenResponses));
    const resp = uniqueResponses.filter(obj =>
      obj.title.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")) ||
      obj.artist.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ""))
    )
    return res.status(200).json(resp ? resp : 'No existen titulos con ese nombre')
  } catch (error) {
    console.log(error);
  }
}
)

module.exports = router;
