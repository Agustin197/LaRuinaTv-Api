const { google } = require("googleapis");
const fs = require("fs");
const { POST_CLIENT_ID, POST_CLIENT_SECRET, REDIRECT_URI, REFRESH_TOKEN } =
  process.env;
const path = require("path");

const oauth2Client = new google.auth.OAuth2(
  POST_CLIENT_ID,
  POST_CLIENT_SECRET,
  "https://developers.google.com/oauthplayground"
);

oauth2Client.setCredentials({
  refresh_token: REFRESH_TOKEN,
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
  const filePath = path.join(__dirname, "logo.jpg");

  let fileMetadata = {
    name: "Photo001",
    mimeType: "image/jpeg",
    laconchadetuhermana: "tuviejaentanga",
  };

  let media = {
    mimeType: "image/jpeg",
    body: fs.createReadStream(filePath),
  };

  try {
    const response = drive.files.create({
      resource: {
        parents: ["1AHVpvZukrnEgJzwdCjDDnpUxuDob8Lbe"],
        fileMetadata,
      },
      requestBody: {
        name: "logooooooo.jpg", //file name
        mimeType: "image/jpg",
      },
      media: media,
    });
    // report the response from the request
    console.log(response);
    return response.data;
  } catch (error) {
    //report the error message
    console.log(error.message);
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
    console.log(
      "laRTAAAAAAAA: ",
      response.data.files.map((e) => e)
    );

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
      var imgLink = `https://www.googleapis.com/drive/v3/files/${id}?supportsAllDrives=true&alt=media`;
      console.log("la concha de tu hermana: ", imgLink);
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
};
