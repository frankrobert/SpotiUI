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
  // Get an artist
  spotifyApi.clientCredentialsGrant()
    .then((data) => {
      // console.log('The access token expires in ' + data.body['expires_in']);
      // console.log('The access token is ' + data.body['access_token']);

      // Save the access token so that it's used in future calls
      res.status(200);
      spotifyApi.setAccessToken(data.body['access_token']);
    }, (err) => {
      res.status(500);
      console.log('Something went wrong when retrieving an access token', err.message)
    })
    .catch(console.error);
});

app.listen(3001, () => console.log('Express Server listening on port 3001!'))