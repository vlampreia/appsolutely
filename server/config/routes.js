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

      app.post('/registerUser', injectDb, function(req, res, next) {
        users.registerUser(req,res,next);
      });

      app.post('/registerDevice', injectDb, function(req, res, next) {
        users.registerDevice(req,res,next);
      });

      app.post('/isAuthenticated', injectDb, function(req, res, next) {
        users.isAuthenticated(req,res,next);
      });

      app.all('/*', function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Authorisation-Token");
        next();
      });

      app.post('/login', injectDb, function(req, res, next) {
        users.login(req,res,next);
      });

      app.all('/a', function(req, res, next) {
        console.log('asdhfjaf');
        res.send('sdgf');
      });

      app.post('/hello', function(req, res, next) {
      console.log('wtf');
        res.send('hello ' + req.param.qr);
      });

      app.get('/register', function(req, res, next) {
        var html = '<!DOCTYPE html>'
                  + '<html>'
                    + '<head>'
                      + '<script type="text/javascript" src="https://js.braintreegateway.com/v2/braintree.js"></script>'
                    + '</head>'
                    + '<body>'
                      + '<form id="merchant-form" action="/create-transaction" method="post">'
                        + '<input type="text" name="payment_method_nonce" id="payment-method-nonce" />'
                        + '<div id="paypal-container"></div>'
                        + '<input type="submit" value="Submit" />'
                      + '</form>'
                      + '<script type="text/javascript">'
                        + 'braintree.setup("AY0mkBAZrqXgXkeDxVfEJXa1HL5-HPouajNkUK6thVVy39dlRb9BqBYBDKtW", "paypal", {'
                        + 'container: "paypal-container",  // to specify DOM elements, use an ID, a DOM node, or a jQuery element'
                        + 'paymentMethodNonceInputField: "payment-method-nonce"'
                        + '});'
                      + '</script>'
                    + '</body>'
                  + '</html>';
        res.send(html);
      });

    }
  }
};

module.exports = Routes();
