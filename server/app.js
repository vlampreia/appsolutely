var express = require('express');
var bodyParser = require('body-parser');
var config = require('./config');
var db = require('./models');
var setRoutes = require('./config/routes.js')


var app = express();


app.set('port', config.port);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

setRoutes(app, db);

db
  .sequelize
  .sync()
  .complete(function(err) {
    if(err) {
      throw err[0];
    } else {
      var server = app.listen(app.get('port'), function() {
        console.log('Listening on port %d', app.get('port'));
      });

      app.use(function(err, req, res, next) {
        res.status(500).send('500 Error');
      });

      app.use(function(req, res, next) {
        res.status(404).send('404 Error');
      });
    };
  });
