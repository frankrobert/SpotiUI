require('es6-promise/auto');
require('isomorphic-fetch');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const qs = require('qs');
const rp = require('request-promise');
const get = require('lodash/get');
const crypto = require('crypto');

import store from '../redux/configure-store';
import actions from '../redux/action-creators';
// const SpotifyWebApi = require('spotify-web-api-node');

// credentials are optional
const client_id = 'b78451c164e446f5b15805ba2eff0936';
const client_secret = 'fa60b663753f4299827a851ab0eda37e';
const redirect_uri ='http://localhost:3001/callback';
const stateKey = 'spotify_auth_state';

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.get('/login-user', (_, res) => {
  const scope = 'user-read-private user-read-email';
  const state = crypto.randomBytes(16).toString('hex');
  const options = {
    response_type: 'code',
    client_id,
    scope,
    redirect_uri,
    state
  };

  console.log('STATE hash', state);
  store.dispatch(actions.authRequested(true));
  res.cookie(stateKey, state);

  // your application requests authorization
  res.redirect(`https://accounts.spotify.com/authorize?${qs.stringify(options)}`);
});


app.get('/callback', async (req, res) => {
  // your application requests refresh and access tokens
  // after checking the state parameter
  console.log('CALLBACK');
  const code = get(req, 'query.code');
  const state = get(req, 'query.state');
  const storedState = get(req, `cookies[${stateKey}]`);

  console.log(storedState, stateKey, state);

  if (!state || state !== storedState) {
    const error = { error: 'state_mismatch' };
    store.dispatch(actions.authFailed('State key mismatched', error, false));
    return res.redirect(`/#${qs.stringify(error)}`);
  }
  res.clearCookie(stateKey);

  const options = {
    url: 'https://accounts.spotify.com/api/token',
    form: {
      code,
      redirect_uri,
      grant_type: 'authorization_code'
    },
    headers: {
      'Authorization': `Basic ${(new Buffer(`${client_id}:${client_secret}`).toString('base64'))}`
    },
    json: true
  };
  let body;

  try {
    body = await rp.post(options);
  } catch (err) {
    console.error(err);
    return res.redirect(`/#${qs.stringify({ error: 'invalid_token' })}`);
  }

  const access_token = get(body, 'access_token');
  // const refresh_token = get(body, 'refresh_token');
  const opts = {
    url: 'https://api.spotify.com/v1/me',
    headers: { 'Authorization': `Bearer ${access_token}` },
    json: true
  };
  let response;
  // use the access token to access the Spotify Web API
  try {
    response = await rp.get(opts);
    store.dispatch(actions.setUserData(response));
    store.dispatch(actions.authSucceeded(false));
  } catch (err) {
    store.dispatch(actions.authFailed('Something went wrong: ', err, false));
    return console.error(err);
  }

  // we can also pass the token to the browser to make requests from there
  // res.redirect('/#' +
  //   qs.stringify({
  //     access_token,
  //     refresh_token
  //   }));
});

app.get('/refresh_token', async (req, res) => {
  // requesting access token from refresh token
  const refresh_token = get(req, 'query.refresh_token');
  const options = {
    url: 'https://accounts.spotify.com/api/token',
    headers: { 'Authorization': `Basic ${(new Buffer(`${client_id}:${client_secret}`).toString('base64'))}` },
    form: { grant_type: 'refresh_token', refresh_token },
    json: true
  };
  let body;

  try {
    body = await rp.post(options);
  } catch (err) {
    console.error(err);
  }

  const access_token = get(body, 'access_token');

  res.send({ access_token });
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

app.post('/add-new-playlist', async (req, res) => {
  console.log('REQ BODY', req.body);
  const { name } = req.body;
  console.log('ADDING NEW PLAYLIST');
  try {
    const newPlaylist = await spotifyApi.createPlaylist('12158323406', name);

    return res.status(200).send(newPlaylist);
  } catch (err) {
    console.error(err);
    return res.status(500).send(err);
  }
});

app.listen(3001, () => console.log('Express Server listening on port 3001!'));