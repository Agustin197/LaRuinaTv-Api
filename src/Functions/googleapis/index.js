require('dotenv').config();
const { POST_CLIENT_ID, POST_CLIENT_SECRET, REDIRECT_URI, REFRESH_TOKEN, API_KEY } = process.env;
const { google } = require('googleapis');

const oauth2Client = new google.auth.OAuth2(
  POST_CLIENT_ID,
  POST_CLIENT_SECRET,
  REDIRECT_URI)

oauth2Client.setCredentials({refresh_token: REFRESH_TOKEN})

const drive = google.drive({
  version: 'v3',
  auth: oauth2Client
})

async function getFolderFiles(idFolder){
  var query = "'" + idFolder + "' in parents"
  try {
    const res = await drive.files.list(
      {
        q: query,
        fields: 'files(id, name)',
      });
    return res.data.files;
    
  } catch (error) {
    console.log(error.message)
  }
}

async function getUrlFileById(id){
  return `https://www.googleapis.com/drive/v3/files/${id}?supportsAllDrives=true&key=${API_KEY}&alt=media`
}

module.exports = {
  getFolderFiles,
  getUrlFileById
}