// If the server environment is not production
if (process.env.NODE_ENV !== 'production') {
  // require the dotenv library that we installed  for development.
  // .config() loads everything in our .env file
  require('dotenv').config();
}

const DARKSKY_API_KEY = process.env.DARKSKY_API_KEY;

// Get the express code (the createApplication function that returns a configured app) from node_modules
const express = require('express');
const app = express();
const axios = require('axios');

app.use(express.json()); // Need to send JSON to the server
app.use(express.static('public')); // Need to use the static assets in the app (CSS, images etc)

// The req parameter contains an object comprising the headers and body sent bythe fetch() request.
app.post('/weather', (req, res) => {
  // So we can access body.latitude and body.longitude 
  const url = `https://api.darksky.net/forecast/${DARKSKY_API_KEY}/${req.body.latitude},${req.body.longitude}?units=auto`;

  // Calling axios performs a post request to the DarkSky API using the URL.
  // With axios, you don't need to set the headers or convert the response from json as with fetch.
  axios({
    url: url,
    responseType: 'json'
  }).then(data => res.json(data.data.currently));
});

// console.log('axios-returned-data: ', data)

app.listen(3000, () => {
  console.log('Server Started');
});
