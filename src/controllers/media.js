const { google } = require("googleapis");
const fs = require("fs");
const os = require('os');
const { POST_CLIENT_ID, POST_CLIENT_SECRET, REDIRECT_URI, REFRESH_TOKEN, VISOR_FOLDER, SLIDER_FOLDER } =
  process.env;
const path = require("path");


const oauth2Client = new google.auth.OAuth2(
  '874900879874-5hn8fcdnj01vckdokqr9a6b6fgvo8mkh.apps.googleusercontent.com',
  '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',
  'https://developers.google.com/oauthplayground'
);

oauth2Client.setCredentials({
  refresh_token: '1//04GK7ANDS4PE1CgYIARAAGAQSNwF-L9Ir0ABvL2lHQwmDxbUC8th8siRL65J0-qLQxaBJ7l7HDNbX2oC0yI997bP8LeGnkRX-HXg'
});

const drive = google.drive({
  version: "v3",
  auth: oauth2Client,
});

//--------Create File----------

const createFile = async () => {
  try {
    const response = await drive.files.create({
      metaData: {
        parents: ["1hbwrmkNOkkXU8_tsbH5_6SM0nwECs7JI"],
        resource: { appProperties: { categories: "tu vieja en tanga" } },
      },
      requestBody: {
        name: "heyy.jpg", //file name
        mimeType: "image/jpg",
      },
      media: {
        mimeType: "image/jpg",
        body: fs.createReadStream(filePath),
      },
    });
    console.log(response.data);
  } catch (error) {
    console.log(error.message);
  }
};


//--------Upload File----------

async function uploadFile(result) {
  console.log('result: ', result)
  const filePathSlider = path.join(os.tmpdir(), `slider-image-${result.get('imageSlider')}`);
  const filePathVisor = path.join(os.tmpdir(), `visor-image-${result.get('imageVisor')}`);
  const lengthSliders = await listAndCountSliderImgs()
  const connectionId = `${result.get('title')}${lengthSliders}`
  
  let fileMetadataSlider = {
    parents: ['1AHVpvZukrnEgJzwdCjDDnpUxuDob8Lbe'],
    appProperties: { 
      'artist': result.get('artist'),
      'title': result.get('title'),
      'info': result.get('info'),
      'connectionId': connectionId,
      'idMedia': {'idYT': result.get('idLinkYT'), 'idSpoty': result.get('idLinkSPOTY'), 'idDrive': result.get('idLinkDRIVE'), 'urlWeb': result.get('urlLinkWEB'), 'urlDownload': result.get('urlLinkDOWNLOAD')},
      'typeMedia': result.get('typeMedia'),
      'categories': result.get('categories'),
      'genre': result.get('genre')
    },
    name: result.get('imageSlider'), //file name
    mimeType: "image/jpg",
  };

  let fileMetadataVisor = {
    parents: ['1XtXvvdt7wmHYNCPJ-kPLpuPOFqS70_1k'],
    appProperties: { 
      'connectionId': connectionId,
    },
    name: 'visor.jpg', //file name
    mimeType: "image/jpg",
  };

  let mediaSlider = {
    mimeType: "image/jpg",
    body: fs.createReadStream(filePathSlider),
  };

  let mediaVisor = {
    mimeType: "image/jpg",
    body: fs.createReadStream(filePathVisor),
  };
  try {
    const responseSlider = await drive.files.create({
      resource: fileMetadataSlider,
      media: mediaSlider,
      fields: "appProperties",
    });

    const responseVisor = await drive.files.create({
      resource: fileMetadataVisor,
      media: mediaVisor,
      fields: "appProperties",
    });
    
    console.log(responseSlider.data)
    console.log(responseVisor.data)
    return {responseSlider, responseVisor};
  } catch (error) {
    console.log(error.message);
  }
}

// async function listHolis() {
//   try {
//     const response = await drive.files.list({
//       fileId: "1AHVpvZukrnEgJzwdCjDDnpUxuDob8Lbe", //sliders
//       q: `'1AHVpvZukrnEgJzwdCjDDnpUxuDob8Lbe' in parents`,
//       fields: 'files(id, name, properties)',
//     });
//     return response.data.files
//   }catch(e){
//     console.log(e)
//   }
// }



//--------List Posts Slider Images----------

async function listPostImages() { 
  try {
    const response = await drive.files.list({
      fileId: "1AHVpvZukrnEgJzwdCjDDnpUxuDob8Lbe", //slider 
      q: `'1AHVpvZukrnEgJzwdCjDDnpUxuDob8Lbe' in parents`,
      fields: "files(id, name, appProperties)",
    });

    const objs = response.data.files.map((e) => e)

    await drive.files.get({
      fileId: e.id,
      fields: "webViewLink, webContentLink",
    });
    const linkimg = objs.map(o => imgLinks(o.id))
    const prop = objs.map(o => o.appProperties)
    let list = []
    for(i in prop){
      const {categories, info, connectionId, title, genre, artist } = prop
      return list.push({sliderImg: linkimg[0], categories, info, connectionId, title, genre, artist})
    }
    console.log('LA LISTA: ', list)
    return list
  } catch (err) {
    console.log(err);
  }
}

function imgLinks(id) {
  var imgLink = `https://drive.google.com/uc?export=view&id=${id}`;
  return imgLink;
}
response.data.files.map(async (e) => {
  const result = await createForGenerateUrl(e);
  return result
});

async function createForGenerateUrl(e) {
  await drive.permissions.create({
    fileId: e.id,
    requestBody: {
      role: "reader",
      type: "anyone",
    },
  });
}
//--------Count Slider Images----------
async function listAndCountSliderImgs() { 
  try {
    const response = await drive.files.list({
      fileId: "1AHVpvZukrnEgJzwdCjDDnpUxuDob8Lbe", //slider 
      q: `'1AHVpvZukrnEgJzwdCjDDnpUxuDob8Lbe' in parents`,
      fields: "files(appProperties)",
    });
    var slidersLength = response.data.files.length
    return slidersLength
  }catch(e){
    console.log(e)
  }
}
//--------List Product Images----------

async function listProdImages() {
  try {
    const response = await drive.files.list({
      fileId: "1AHVpvZukrnEgJzwdCjDDnpUxuDob8Lbe", //sliders
      q: `'1AHVpvZukrnEgJzwdCjDDnpUxuDob8Lbe' in parents`,
      fields: "files(id, name)",
    });

    const objs = response.data.files.map((e) => e)

    async function createFileToUpload(e) {
      await drive.permissions.create({
        fileId: e.id,
        requestBody: {
          role: "reader",
          type: "anyone",
        },
      });
      await drive.files.get({
        fileId: e.id,
        fields: "webViewLink, webContentLink",
      });
    }

    function imgLinks(id) {
      var imgLink = `https://drive.google.com/uc?export=view&id=${id}`;
      console.log('el imgLink: ', imgLink)
      return imgLink;
    }
    response.data.files.map(async (e) => {
      await createFileToUpload(e);
    });

    return objs.map(o => imgLinks(o.id))
  } catch (err) {
    console.log(err);
  }
}

//--------Get Product By Name----------

async function getProductByName() {
  try {
    const response = await drive.files.get({
      fileId: "1hmPyVTGkRDjMgQVQJKSdNAVifNOVy2kA",
      q: 'name = "producto1.png" and parents in "1BkJ-dQUAn_642S-dQU8ibV83r0ASs-ik"',
    });
    return await response.data;
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  uploadFile,
  createFile,
  getProductByName,
  listProdImages,
  listPostImages
};
