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

app.use(express.json()); // Need to send JSON to the server
app.use(express.static('public')); // Need to use the static assets in the app (CSS, images etc)

// Our only endpoint
app.post('/weather', (req, res) => {});

app.listen(3000, () => {
  console.log('Server Started');
});
