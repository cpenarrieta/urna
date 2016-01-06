var express = require('express');
var mongoose = require('mongoose');

var app = express();

mongoose.connect('mongodb://localhost/urna');

require('./middleware.js')(app, express);
require('./routes.js')(app, express);

app.listen((process.env.PORT || 8000), function () {
  console.log('App listening on port', (process.env.PORT || 8000));
});

module.exports = app;