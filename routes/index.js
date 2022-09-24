//require express
const express = require('express');
//import router
const noteRouter = require('./notes')
//create app with express
const app = express();
//use route
app.use('/notes', noteRouter);
//export
module.exports = app;