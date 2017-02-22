// DEPENDANCIES
// require express for web framework and server
const express = require('express');

// require mongoose for object modeling interaction with MongoDB
const mongoose = require('mongoose');

// body parsing middleware
const bodyParser = require('body-parser');

// Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it.
const methodOverride = require('method-override');

// A modern JavaScript utility library delivering modularity, performance & extras.
const _ = require('lodash');

// SETUP
const config = {};
config.port = 3000;
config.db = 'mongodb://localhost/trailers'

// START THE APPLICATION
const app = express();

// CORS SUPPORT
// CAUTTION! opens up server to all urls. Proper authentication must be in place.
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
})

// ADD MIDDLEWARE
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));

// CONNECT TO MONGODB
mongoose.connect(config.db);
mongoose.connection.once('open', function () {
  // Start server
  app.listen(config.port, function () {
    console.log('listening on port ' + config.port + '....  ')
  })
  // Load models
  app.models = require('./models/Index.js')

 // load routes
 var routes = require('./routes');
 _.each(function (controller, route) {
   app.use(route, controller(app, route));
 })
});

// EXPORT
module.exports = app;
