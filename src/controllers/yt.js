// const { google } = require('googleapis');
// const { JWT } = require('google-auth-library');

// // Lee el client_email y la private_key de la variable de entorno
// const credentials = require('../misc/credentials.json')
// const client_email = credentials.client_email;
// const private_key = credentials.private_key
// // .replace(/\\n/g, '\n');

// async function isUserSubscribed(req, res) {
//   console.log(req.body)
//   const userEmail = req.body.userEmail

//   // Crea el objeto de autenticación JWT
//   const authClient = new JWT({
//     email: client_email,
//     key: private_key,
//     scopes: ['https://www.googleapis.com/auth/youtube.readonly']
//   });

//   // Crea el cliente de la API de YouTube
//   const youtube = google.youtube({ version: 'v3', auth: authClient });

//   // Obtén la información del canal
//   const channelResponse = await youtube.channels.list({
//     part: 'snippet',
//     id: 'UCD8dZZ0aM2yHj4t80abSZZA'
//   });
//   const channel = channelResponse.data.items[0];

//   // Obtén la lista de suscripciones del canal
//   const subscriptions = [];
//   let nextPageToken;
//   do {
//     const subscriptionResponse = await youtube.subscriptions.list({
//       key: 'AIzaSyA2Wu55YdP_0ic3zkHtnk2jZzmHAJ-tbss',
//       part: 'snippet',
//       channelId: channel.id,
//       maxResults: 50,
//       pageToken: nextPageToken
//     });
//     subscriptions.push(...subscriptionResponse.data.items);
//     nextPageToken = subscriptionResponse.data.nextPageToken;
//   } while (nextPageToken);

//   // Verifica si el usuario está suscrito
//   const response = subscriptions.some(subscription => subscription.snippet.subscriberEmail === userEmail);
//   return res.status(200).json(response)
// }

const { google } = require('googleapis');
const auth = new google.auth.GoogleAuth({
  keyFile: '/app/src/controllers/credentials.json',
  scopes: ['https://www.googleapis.com/auth/youtube.force-ssl']
});

const youtube = google.youtube({
  version: 'v3',
  auth: auth
});

async function checkSubscription(email) {
    const response = await youtube.subscriptions.list({
      part: 'id,snippet',
      mine: true,
      maxResults: 50
    });
    const subscriptions = await response.data.items;
    console.log(subscriptions)
    const isSubscribed = subscriptions.some(subscription => subscription.snippet.email === email)
}

async function getMyChannelName() {
    const response = await youtube.channels.list({
      part: 'snippet',
      mine: true
    });
  
    const channel = await response;
    console.log('la response: ', channel.data)
    const channelName = channel.snippet.title;
    console.log(channelName)
  
    return channelName;
  }

const isUserSubscribed = async (req, res) => {
    getMyChannelName()
    // checkSubscription('valearellano14@gmail.com')
    // .then(isSubscribed => console.log(isSubscribed))
    // .catch(err => console.error(err));
}


module.exports = { isUserSubscribed }
