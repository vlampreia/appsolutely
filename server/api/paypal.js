var PayPal = function() {
  var paypal = require('paypal-rest-sdk');
  
  var payment = {
    intent: 'sale',
    payer: {
      payment_method: 'paypal'
    },
    redirect_urls: {
      return_url: 'http://serv/executePayPalPayment',
      cancel_url: 'http://serv/cancelPayPalPayment'
    },
    transactions: [{
      amount: {
        total: '50000000.0',
        currency: 'USD'
      },
      description: 'give ME MONEY!!!'
    }]
  };

  var gateway;

  return{
    init: function(config) {
      paypal.configure(config);
      //gateway = 2
    },

    create: function(req, res, next) {
      paypal.payment.create(payment, function(error, payment) {
        if(error) {
          console.log('Error: ', error);
        } else {
          if(payment.payer.payment_method === 'paypal') {
            req.session.paymentId = payment.id;
            var redirectUrl;
            for(var i=0; i<payment.links.length; i++) {
              var link = payment.links[i];
              if(link.method === 'REDIRECT') {
                redirectUrl = link.href;
              };
            };
          };
          res.redirect(redirectUrl);
        };
      });
    },

    execute: function(req, res, next) {
      var paymentId = req.session.paymentId;
      var payerId = req.param('PayerId');

      var details = {payer_id: payerId};
      paypal.payment.execute(paymentId, details, function(error, payment) {
        if(error) {
          console.log('Error: ', error);
        } else {
          res.send('Done');
        };
      });
    }

  };

};

module.exports = PayPal;

