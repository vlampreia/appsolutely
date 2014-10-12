var PayPal = require(__dirname + '/../api/paypal.js');
var Users = require(__dirname + '/../api/users.js');

var Routes = function() {
  var _db;

  var paypal = PayPal();
  var users = Users();

  function injectDb(req, res, next) {
    req.db = _db;
    next();
  }

  return {
    init: function(config, app, db) {
      _db = db;

      paypal.init(config.paypalApi);

      app.get('/createPayPalPayment', function(req, res, next) {
        paypal.create(req, res, next);
      });

      app.get('/executePayPalPayment', function(req, res, next) {
        paypal.execute(req, res, next);
      });

      app.get('/cancelPayPalPayment', function(req, res, next) {
        res.send('Payment was cancelled');
      });

      app.get('/registerUser', injectDb, function(req, res, next) {

      });

      app.all('/a', function(req, res, next) {
        console.log('asdhfjaf');
        res.send('sdgf');
      });

      app.post('/hello', function(req, res, next) {
      console.log('wtf');
        res.send('hello ' + req.param.qr);
      });

    }
  }
};

module.exports = Routes();
