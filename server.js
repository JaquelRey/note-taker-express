//require express
const express = require('express');
//set path
const path = require('path');
//require middleware
const { custom } = require('./middleware/custom');
//custom api
const api = require('./routes/index.js');

//set port
const PORT = process.env.PORT || 3001;
//create app with express
const app = express();

//import custom middleware
app.use(custom);

//use express as middleware to parse JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//use api
app.use('/api', api);

//set static route
app.use(express.static('public'));

//get route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);
//get route for notes
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);
//get route for notes by id
app.get('/notes:', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);
//error redirect route (wildcard)
//I made the 404 + route, and then realized that requirements want the index as redirect :(
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/index.html'))
);
//listener
app.listen(PORT, () =>
  console.log(`Listening at http://localhost:${PORT}`)
);