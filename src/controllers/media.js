const { google } = require("googleapis");
const fs = require("fs");
const { POST_CLIENT_ID, POST_CLIENT_SECRET, REDIRECT_URI, REFRESH_TOKEN } =
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

const createFile = async () => {
  try {
    const response = await drive.files.create({
      metaData: {
        parents: ["1hbwrmkNOkkXU8_tsbH5_6SM0nwECs7JI"],
        resource: { appProperties: { category: "tu vieja en tanga" } },
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

async function uploadFile() {
  const filePath = path.join(__dirname, "LOGO.jpg");

  let fileMetadata = {
    parents: ['1AHVpvZukrnEgJzwdCjDDnpUxuDob8Lbe'],
    appProperties: { laconchadetuhermana: "tuviejaentanga"},
    name: "fotito.jpg", //file name
    mimeType: "image/jpg",
  };

  let media = {
    mimeType: "image/jpeg",
    body: fs.createReadStream(filePath),
  };

  try {
    const response = drive.files.create({
      resource: fileMetadata,
      media: media,
      fields: 'id',
    });
    // report the response from the request
    console.log(response);
    return response.data;
  } catch (error) {
    //report the error message
    console.log(error.message);
  }
}

async function listHolis() {
  try {
    const response = await drive.files.list({
      fileId: "1AHVpvZukrnEgJzwdCjDDnpUxuDob8Lbe", //sliders
      q: `'1AHVpvZukrnEgJzwdCjDDnpUxuDob8Lbe' in parents`,
      fields: "files(id, name, appProperties)",
    });
    console.log('LA RESPONSE', response)
    console.log('LA RESPONSE DATA', response.data)
    return response
  }catch(e){
    console.log(e)
  }
}

async function listProductsImages() {
  try {
    const response = await drive.files.list({
      fileId: "1AHVpvZukrnEgJzwdCjDDnpUxuDob8Lbe", //sliders
      q: `'1AHVpvZukrnEgJzwdCjDDnpUxuDob8Lbe' in parents`,
      fields: "files(id, name)",
    });

    const objs = response.data.files.map((e) => e)

    async function holaaa(e) {
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
      return imgLink;
    }
    response.data.files.map(async (e) => {
      await holaaa(e);
    });

    return objs.map(o => imgLinks(o.id))
  } catch (err) {
    console.log(err);
  }
}

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

async function generatePublicUrl(id) {
  try {
    const fileId = id;
    await drive.permissions.create({
      fileId: fileId,
      requestBody: {
        role: "reader",
        type: "anyone",
      },
    });

    await drive.files.get({
      fileId: fileId,
      fields: "webViewLink, webContentLink",
    });

    var imgLink = `https://www.googleapis.com/drive/v3/files/${id}`;
    console.log("la concha de tu hermana: ", imgLink);
    return imgLink;
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = {
  uploadFile,
  createFile,
  getProductByName,
  listProductsImages,
  generatePublicUrl,
  listHolis
};
