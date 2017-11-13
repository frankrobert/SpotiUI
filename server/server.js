require('es6-promise/auto');
require('isomorphic-fetch');
const express = require('express');
const cors = require('cors');
const SpotifyWebApi = require('spotify-web-api-node');

// credentials are optional
const spotifyApi = new SpotifyWebApi({
  clientId : 'b78451c164e446f5b15805ba2eff0936',
  clientSecret : 'fa60b663753f4299827a851ab0eda37e',
  redirectUri : 'localhost:3000'
});

const app = express()

app.use(cors());

app.get('/authorize', (req, res) => {
  console.log('AUTHORIZING');
  
  // Get an artist
  spotifyApi.clientCredentialsGrant()
    .then((data) => {
      // console.log('The access token expires in ' + data.body['expires_in']);
      // console.log('The access token is ' + data.body['access_token']);

      // Save the access token so that it's used in future calls
      spotifyApi.setAccessToken(data.body['access_token']);
      console.log('RECEIVED ACCESS TOKEN');
      return res.send('Successfully authorized application');      
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).send(err);
    });
});

app.get('/get-user-playlists', async (req, res) => {
  console.log('GETTING USER PLAYLISTS');
  let playlists;

  try {
    playlists = await spotifyApi.getUserPlaylists('12158323406'); // TODO replace user
  } catch (err) {
    console.error(err);
    return res.status(500).send(err);
  }
  if (playlists) return res.send(playlists.body.items);
});

app.listen(3001, () => console.log('Express Server listening on port 3001!'))