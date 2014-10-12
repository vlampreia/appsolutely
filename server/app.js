//
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');

//
var config = require(__dirname + '/config')();
var db = require(__dirname + '/models');
var routes = require(__dirname + '/config/routes.js')
var auth = require(__dirname + '/config/auth.js');

var passport = auth(db);
var app = express();


app.set('port', config.port);

app.use(session({secret: 'potato'}));
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

routes.init(config, app, db);

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
