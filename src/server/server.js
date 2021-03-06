import 'es6-promise/auto';
import 'isomorphic-fetch';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import qs from 'qs';
import rp from 'request-promise';
import get from 'lodash/get';
import crypto from 'crypto';

const client_id = 'b78451c164e446f5b15805ba2eff0936';
const client_secret = 'fa60b663753f4299827a851ab0eda37e';
const redirect_uri ='http://localhost:3001/callback';
const stateKey = 'spotify_auth_state';

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());
const scope = 'user-read-private user-read-email playlist-modify-public ugc-image-upload';

app.get('/login-user', (_, res) => {
  const state = crypto.randomBytes(16).toString('hex');
  const options = {
    response_type: 'code',
    client_id,
    scope,
    redirect_uri,
    state
  };

  res.cookie(stateKey, state);

  res.redirect(`https://accounts.spotify.com/authorize?${qs.stringify(options)}`);
});


app.get('/callback', async (req, res) => {
  const code = get(req, 'query.code');
  const state = get(req, 'query.state');
  const storedState = get(req, `cookies[${stateKey}]`);

  if (!state || state !== storedState) {
    const error = { error: 'state_mismatch' };

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
  const refresh_token = get(body, 'refresh_token');

  res.redirect(`http://localhost:3000/user/${access_token}/${refresh_token}`);
});

app.get('/user-data', async (req, res) => {
  const access_token = get(req, 'query.access_token');
  const opts = {
    url: 'https://api.spotify.com/v1/me',
    headers: { 'Authorization': `Bearer ${access_token}` },
    json: true
  };
  let userData;
  try {
    userData = await rp.get(opts);
  } catch (err) {
    console.error(err);
    return res.status(err.statusCode).send(err);
  }

  res.status(200).send(userData);
});

app.get('/refresh_token', async (req, res) => {
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
    return res.status(err.statusCode).send(err);
  }

  const access_token = get(body, 'access_token');

  return res.status(200).send({ access_token });
});

app.get('/get-user-playlists', async (req, res) => {
  const access_token = get(req, 'query.access_token');
  const options = {
    url: 'https://api.spotify.com/v1/me/playlists',
    headers: { 'Authorization': `Bearer ${access_token}` },
    qs: {
      limit: 50
    },
    json: true
  };
  let playlists;

  try {
    playlists = await rp.get(options);
  } catch (err) {
    console.error(err);
    return res.status(err.statusCode).send(err);
  }

  return res.send(playlists);
});

app.post('/add-new-playlist', async (req, res) => {
  const { access_token, description, name, user_id } = req.body;
  const options = {
    url: `https://api.spotify.com/v1/users/${user_id}/playlists`,
    headers: {
      'Authorization': `Bearer ${access_token}`,
      'Content-Type': 'application/json'
    },
    body: {
      name,
      description,
    },
    json: true
  };
  let newPlaylist;
  try {
    newPlaylist = await rp.post(options);

    return res.status(200).send(newPlaylist);
  } catch (err) {
    console.error(err);
    return res.status(err.statusCode).send(err);
  }
});

app.listen(3001, () => console.log('Express Server listening on port 3001!'));