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

oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN});

async function refreshAccessToken() {
  try {
      const token = await oauth2Client.refreshAccessToken();
      console.log(token)
      oauth2Client.setCredentials({refresh_token: token.credentials.refresh_token});
      return token.credentials.refresh_token
  } catch (error) {
      console.error('Error al actualizar los tokens:', error);
  }
}

setInterval(() => {
  refreshAccessToken();
}, 5000 * 60);
// 20 * 60000

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

//----------LIST AUDIO IDs------------

const getAudioIds = () => {
  let audioFolder = '1-5iQClHhyavOERDhut0vhFsRg2EE14FP'


}

//--------Upload File----------

async function uploadFile(result, mappingImages, mappingFiles) {
  const filePathSlider = mappingImages.has('imageSlider') ? path.join(os.tmpdir(), `slider-image-${mappingImages.get('imageSlider')}`) : null;
  const filePathVisor = mappingImages.has('imageVisor') ? path.join(os.tmpdir(), `visor-image-${mappingImages.get('imageVisor')}`) : null;
  const filePathAudio = mappingFiles.has('audioFile') ? path.join(os.tmpdir(), `audio-file-${mappingFiles.get('audioFile')}`) : null;
  const filePathVideo = mappingFiles.has('videoFile') ? path.join(os.tmpdir(), `video-file-${mappingFiles.get('videoFile')}`) : null;

  const lengthSliders = await listAndCountSliderImgs()
  const connectionId = `${result.get('title')}${lengthSliders}`

  let parentsSlider = ['1AHVpvZukrnEgJzwdCjDDnpUxuDob8Lbe']
  let parentVisor = ['1XtXvvdt7wmHYNCPJ-kPLpuPOFqS70_1k']
  let parentAudio = ['1-5iQClHhyavOERDhut0vhFsRg2EE14FP']
  let parentVideo = ['1-9w68xsizndeGlLDiWrPznFfwQReAGgx']
  let appProperties = {
    'id': Number(lengthSliders),
    'artist': result.get('artist'),
    'title': result.get('title'),
    'info': result.get('info'),
    'connectionId': connectionId,
    'idLinkYT': result.get('idLinkYT'),
    'idLinkSPOTY': result.get('idLinkSPOTY'),
    'idLinkDRIVE': result.get('idLinkDRIVE'),
    'urlLinkWEB': result.get('urlLinkWEB'),
    'urlLinkDOWNLOAD': result.get('urlLinkDOWNLOAD'),
    'idMedia': {},
    'mediaType': result.get('mediaType'),
    'categories': result.get('categories'),
    'genre': result.get('genre')
  }
  let nameSlider = mappingImages.get('imageSlider') //file name
  let nameVisor = mappingImages.get('imageVisor') //file name
  let nameAudio = mappingFiles.get('audioFile') //file name
  let nameVideo = mappingFiles.get('videoFile') //file name
  let mimeType = "image/jpg"
  let mimeTypeAudio = "audio/mpeg"
  let mimeTypeVideo = "video/mp4"

  let mediaSlider
  if (filePathSlider) {
    mediaSlider = {
      mimeType: mimeType,
      body: fs.createReadStream(filePathSlider),
    };
  }
  let mediaVisor
  if (filePathVisor) {
    mediaVisor = {
      mimeType: mimeType,
      body: fs.createReadStream(filePathVisor),
    }
  };
  let mediaAudio
  if (filePathAudio) {
    mediaAudio = {
      mimeType: mimeTypeAudio,
      body: fs.createReadStream(filePathAudio),
    }
  };
  let mediaVideo
  if (filePathVideo) {
    mediaVideo = {
      mimeType: mimeTypeVideo,
      body: fs.createReadStream(filePathVideo),
    };
  }


  try {
    switch (mappingImages.size) {
      case 1:
        // Check if the first image is the slider or visor
        if (mappingImages.has("imageSlider")) {
          console.log("Uploading slider duplicated in visor.");
          await drive.files.create({
            resource: {
              parents: parentsSlider,
              appProperties: appProperties,
              name: nameSlider,
              mimeType: mimeType
            },
            media: {
              mimeType: mimeType,
              body: fs.createReadStream(filePathSlider),
            },
            fields: "appProperties",
          });
          await drive.files.create({
            resource: {
              parents: parentVisor,
              appProperties: appProperties,
              name: nameSlider,
              mimeType: mimeType
            },
            media: {
              mimeType: mimeType,
              body: fs.createReadStream(filePathSlider),
            },
            fields: "appProperties",
          });
        } else if (mappingImages.has("imageVisor")) {
          console.log("Uploading visor duplicated in slider.");
          await drive.files.create({
            resource: {
              parents: parentVisor,
              appProperties: appProperties,
              name: nameVisor,
              mimeType: mimeType
            },
            media: {
              mimeType: mimeType,
              body: fs.createReadStream(filePathVisor),
            },
            fields: "appProperties",
          });
          await drive.files.create({
            resource: {
              parents: parentsSlider,
              appProperties: appProperties,
              name: nameVisor,
              mimeType: mimeType
            },
            media: {
              mimeType: mimeType,
              body: fs.createReadStream(filePathVisor),
            },
            fields: "appProperties",
          });
        }
        break;
      case 2:
        console.log("Uploading both slider and visor images.");
        await drive.files.create({
          resource: {
            parents: parentsSlider,
            appProperties: appProperties,
            name: nameSlider,
            mimeType: mimeType
          },
          media: {
            mimeType: mimeType,
            body: fs.createReadStream(filePathSlider),
          },
          fields: "appProperties",
        });
        await drive.files.create({
          resource: {
            parents: parentVisor,
            appProperties: appProperties,
            name: nameVisor,
            mimeType: mimeType
          },
          media: {
            mimeType: mimeType,
            body: fs.createReadStream(filePathVisor),
          },
          fields: "appProperties",
        });
        break;
      default:
        console.log('No images to upload...')
    }

    if (mappingFiles.has('videoFile')) {
      await drive.files.create({
        resource: {
          parents: parentVideo,
          appProperties: appProperties,
          name: nameVideo,
          mimeType: mimeTypeVideo
        },
        media: mediaVideo,
        fields: "appProperties",
      });
    }

    if (mappingFiles.has('audioFile')) {
      await drive.files.create({
        resource: {
          parents: parentAudio,
          appProperties: appProperties,
          name: nameAudio,
          mimeType: mimeTypeAudio
        },
        media: mediaAudio,
        fields: "appProperties",
      });
    }
  } catch (error) {
    console.log(error)
  }
}


//--------List Posts Slider Images----------
function imgLinks(id) {
  var imgLink = `https://drive.google.com/uc?export=view&id=${id}`;
  return imgLink;
}

async function createForGenerateUrl(e, index) {
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

  const linkimg = imgLinks(e.id)
  const prop = e.appProperties
  const { id, idLinkSPOTY, idLinkDRIVE, urlLinkWEB, urlLinkDOWNLOAD, categories, info, connectionId, title, genre, artist, idMedia, idLinkYT, mediaType } = prop
  return { 
    id, 
    linkimg, 
    idLinkSPOTY, 
    idLinkDRIVE, 
    urlLinkWEB, 
    urlLinkDOWNLOAD, 
    categories, 
    info, 
    connectionId, 
    title, 
    genre, 
    artist, 
    idMedia, 
    idLinkYT, 
    mediaType }
}

async function listPostImages() {
  const list = []
  try {
    const response = await drive.files.list({
      fileId: "1AHVpvZukrnEgJzwdCjDDnpUxuDob8Lbe", //slider 
      q: `'1AHVpvZukrnEgJzwdCjDDnpUxuDob8Lbe' in parents`,
      fields: "files(id, name, appProperties)",
    });

    const res = response.data.files.map(async (e, index) => {
      list.push(await createForGenerateUrl(e, index));
      return list
    });
    console.log('el resssssssss!!!!!')
    return res
  } catch (err) {
    console.log(err);
  }
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
  } catch (e) {
    console.log(e)
  }
}


//--------List Visor Images----------

async function createForGenerateUrlVisor(e, index) {
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

  const linkimg = imgLinks(e.id)
  const prop = e.appProperties
  const { id, idLinkSPOTY, idLinkDRIVE, urlLinkWEB, urlLinkDOWNLOAD, categories, info, connectionId, title, genre, artist, idMedia, idLinkYT, mediaType } = prop
  return { id, linkimg, idLinkSPOTY, idLinkDRIVE, urlLinkWEB, urlLinkDOWNLOAD, categories, info, connectionId, title, genre, artist, idMedia, idLinkYT, mediaType }

}

async function listPostVisorImages() {
  const list = []
  try {
    const response = await drive.files.list({
      fileId: "1XtXvvdt7wmHYNCPJ-kPLpuPOFqS70_1k", //slider 
      q: `'1XtXvvdt7wmHYNCPJ-kPLpuPOFqS70_1k' in parents`,
      fields: "files(id, name, appProperties)",
    });

    //const objs = response.data.files.map((e) => e)
    const res = response.data.files.map(async (e, index) => {
      list.push(await createForGenerateUrlVisor(e, index));
      return list
    });
    return res
  } catch (err) {
    console.log(err);
  }
}


async function getMp3Id (id) {
  try {
    const audio = await drive.files.list({
      fileId: '1-5iQClHhyavOERDhut0vhFsRg2EE14FP', //audios
      q: `appProperties has { key='connectionId' and value='${id}' }`,
      fields: "files(id, appProperties)",
    });
    console.log('el audio con sus properties: ', audio.data.files[0])
    return audio.data.files[0]
  }catch(err){
    console.log(err)
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


    const response = await drive.files.list({
      fileId: "1hmPyVTGkRDjMgQVQJKSdNAVifNOVy2kA",
      q: 'name = "producto1.png" and parents in "1BkJ-dQUAn_642S-dQU8ibV83r0ASs-ik"',
    });
    return await response.data;
  } catch (err) {
    console.log(err);
  }
}


///////////// LIKE /////////////////

const contentLikes = {};

const contentController = {}

contentController.likeContent = function (req, res) {

  const contentId = req.params.id;

  if (!contentLikes[contentId]) {
    contentLikes[contentId] = 0;
  }

  contentLikes[contentId] += 1;

  res.status(200).send({ message: 'Me gusta agregado', likes: contentLikes[contentId] });
}

///////////////////////////////////


const updateImageAndMeta = async (result, mappingImages, mappingFiles) => {
  const filePathSlider = mappingImages.get('imageSlider') !== null ? path.join(os.tmpdir(), `slider-image-${mappingImages.get('imageSlider')}`) : null;
  const filePathVisor = mappingImages.get('imageVisor') !== null ? path.join(os.tmpdir(), `visor-image-${mappingImages.get('imageVisor')}`) : null;
  const filePathAudio = mappingFiles.has('audioFile') ? path.join(os.tmpdir(), `audio-file-${mappingFiles.get('audioFile')}`) : null;
  const filePathVideo = mappingFiles.has('videoFile') ? path.join(os.tmpdir(), `video-file-${mappingFiles.get('videoFile')}`) : null;
  
  const connectionId = `${result.get('connectionId')}`

  let appProperties = {
      'id': result.get('id'),
      'artist': result.get('artist'),
      'title': result.get('title'),
      'info': result.get('info'),
      'connectionId': connectionId,
      'idLinkYT': result.get('idLinkYT'),
      'idLinkSPOTY': result.get('idLinkSPOTY'),
      'idLinkDRIVE': result.get('idLinkDRIVE'),
      'urlLinkWEB': result.get('urlLinkWEB'),
      'urlLinkDOWNLOAD': result.get('urlLinkDOWNLOAD'),
      'idMedia': {},
      'mediaType': result.get('mediaType'),
      'categories': result.get('categories'),
      'genre': result.get('genre')
  }

  let parentsSlider = ['1AHVpvZukrnEgJzwdCjDDnpUxuDob8Lbe']
  let parentVisor = ['1XtXvvdt7wmHYNCPJ-kPLpuPOFqS70_1k']
  let parentAudio = ['1-5iQClHhyavOERDhut0vhFsRg2EE14FP']
  let parentVideo = ['1-9w68xsizndeGlLDiWrPznFfwQReAGgx']

  let nameSlider = mappingImages.get('imageSlider') //file name
  let nameVisor = mappingImages.get('imageVisor') //file name
  let nameAudio = mappingFiles.get('audioFile') //file name
  let nameVideo = mappingFiles.get('videoFile') //file name

  let mimeType = "image/jpg"
  let mimeTypeAudio = "audio/mpeg"
  let mimeTypeVideo = "video/mp4"

  try {
    await drive.files.update({
      fileId: `${result.get('idFileSlider')}`,
      resource: fileMetadataSlider,
      fields: 'appProperties'
    })
    await drive.files.update({
      fileId: `${result.get('idFileVisor')}`,
      resource: fileMetadataVisor,
      fields: 'appProperties'
    })
    if(result.get('idAudioFile')){
      await drive.files.update({
        fileId: `${result.get('idAudioFile')}`,
        resource: {
          parents: parentAudio,
          appProperties: appProperties,
          name: nameAudio,
          mimeType: mimeType
        },
        fields: 'appProperties'
      })
    }
    if(result.get('idVideoFile')){
      await drive.files.update({
        fileId: `${result.get('idVideoFile')}`,
        resource: {
          parents: parentVideo,
          appProperties: appProperties,
          name: nameVideo,
          mimeType: mimeType
        },
        fields: 'appProperties'
      })
    }
    console.log('Successfully updated appProperties!')
  } catch (error) {
    console.log(error)
  }

  try {
    switch (mappingImages.size) {
      case 1:
        // Check if the first image is the slider or visor
        if (mappingImages.has("imageSlider")) {
          console.log("Updating slider image only.");
          let mediaSlider = {
            mimeType: "image/jpg",
            body: fs.createReadStream(filePathSlider),
          };
          await drive.files.update({
            fileId: `${result.get('idFileSlider')}`,
            media: mediaSlider
          })
        } else if (mappingImages.has("imageVisor")) {
          console.log("Updating visor image only.");
          let mediaVisor = {
            mimeType: "image/jpg",
            body: fs.createReadStream(filePathVisor),
          };
          await drive.files.update({
            fileId: `${result.get('idFileVisor')}`,
            media: mediaVisor
          })
        }
        break;
      case 2:
        console.log("Updating both slider and visor images.");
        let mediaSlider = {
          mimeType: "image/jpg",
          body: fs.createReadStream(filePathSlider),
        };
        await drive.files.update({
          fileId: `${result.get('idFileSlider')}`,
          media: mediaSlider
        })
        let mediaVisor = {
          mimeType: "image/jpg",
          body: fs.createReadStream(filePathVisor),
        };
        await drive.files.update({
          fileId: `${result.get('idFileVisor')}`,
          media: mediaVisor
        })
        break;
      default:
        console.log('No images to update...')
    }


    if (mappingFiles.has('videoFile')) {
      console.log('updating video file!')
      let mediaVideo = {
        mimeType: "image/jpg",
        body: fs.createReadStream(filePathVideo),
      };
      await drive.files.update({
        fileId: `${result.get('idVideoFile')}`,
        media: mediaVideo
      });
    }

    if (mappingFiles.has('audioFile')) {
      console.log('updating audio file!')
      let mediaAudio = {
        mimeType: "image/jpg",
        body: fs.createReadStream(filePathAudio),
      };
      await drive.files.create({
        fileId: `${result.get('idAudioFile')}`,
        media: mediaAudio
      });
    }
  } catch (error) {
    console.log(error)
  }
}


const getEditMedia = async (req) => {
  const { id } = req.params
  try {
    const listSlider = await drive.files.list({
      fileId: "1AHVpvZukrnEgJzwdCjDDnpUxuDob8Lbe",
      q: `appProperties has { key='connectionId' and value='${id}' }`,
      fields: 'files(id, name, appProperties)'
    })
    const listVisor = await drive.files.list({
      fileId: "1XtXvvdt7wmHYNCPJ-kPLpuPOFqS70_1k",
      q: `appProperties has { key='connectionId' and value='${id}' }`,
      fields: 'files(id, name, appProperties)'
    })
    const imgLinkIdSlider = listSlider.data?.files[0].id
    const imgLinkIdVisor = listSlider.data?.files[1].id
    const imgLinkIdAudio = listSlider.data?.files[2].id
    const imgLinkIdVideo = listSlider.data.files[3] && listSlider.data.files[3].id;

    const imgLinkSlider = `https://drive.google.com/uc?export=view&id=${imgLinkIdSlider}`;
    const imgLinkVisor = `https://drive.google.com/uc?export=view&id=${imgLinkIdVisor}`;
   
    listSlider.data.files[0].appProperties.imgLink = imgLinkSlider;
    listSlider.data.files[1].appProperties.idFileSlider = imgLinkIdSlider;
    listSlider.data.files[1].appProperties.imgLink = imgLinkVisor;
    listSlider.data.files[1].appProperties.idFileVisor = imgLinkIdVisor;
    listSlider.data.files[2].appProperties.idAudioFile = imgLinkIdAudio ? imgLinkIdAudio : null;
    if(listSlider.data.files[3]){
      listSlider.data.files[3].appProperties.idVideoFile = imgLinkIdVideo
    } 

    
    console.log('la response . data ', listSlider.data.files)
    return { files: listSlider.data.files };
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  uploadFile,
  createFile,
  getProductByName,
  listProdImages,
  listPostImages,
  listPostVisorImages,
  getMp3Id,
  contentController,
  getEditMedia,
  updateImageAndMeta,
  listPostVisorImages
};
