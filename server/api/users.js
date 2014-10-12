var crypto = require('crypto');

var Users = function() {

  return {
    registerUser: function(req, res, next) {
      var regCode = req.params.regCode;
      var siteToken = req.params.siteToken;
      
      //TODO: CREATE SECRET
      var userSecret = 'dolphins';

      var registration = req.db.Registration.build({
        regCode: regCode,
        userSecret: userSecret,
        siteToken: siteToken
      });

      registration.save().success(function(registration) {
        if(registration) return next();
      });
    },

    registerDevice: function(req, res, next) {
      var regCode = req.params.regCode;
      var deviceCode = req.params.deviceCode;

      req.db.Registration.find({where: {regCode: regCode}, limit:1})
      .success(function(registrations) {

        if(registrations.length == 1) {
          var registration = registrations[0];

          req.db.Site.find({where: {token: registration.siteToken}, limit:1})
          .success(function(sites) {
            if(sites.length == 1) {
              var site = sites[0];
              
              var user = req.db.User.build({
                secret: registration.userSecret,
                deviceToken: deviceCode
              });

              user.save().success(function(user) {
                if(user) {
                  site.addUser(user).success(function() {
                    return res.send('Device registered');
                  });
                } else {
                  return res.send('Error registering user');
                };
              });

            } else {
              return res.send('Invalid site token');
            };
          })
          .error(function(err) {
            return res.send('Error retrieving site');
          });

        } else {
          return res.send('Invalid registration token')
        };
      })
      .error(function(err) {
        res.send('Error retrieving registration');
      });
    },

    isAuthenticated: function(req, res, next) {
      var rqr = req.body.rqr;
      req.db.Authentication.find({where: {rqr: rqr}})
      .success(function(authentication) {
        console.log('asdasda');
        if(authentication.authenticated) {
          return res.send({hash3: authentication.hash3});
        } else {
          console.log("NOT AUTHENTICATED !");
        };
      })
      .error(function(err) {
        return res.send('Error retrieving authentication');
      });
    },

    login: function(req, res, next) {
      var hash2 = req.body.hash;
      var userSecret = req.body.user_secret;
      var rqr = req.body.rqr;
      
      req.db.User.find({where: {secret: userSecret}})
      .success(function(user) {
        //if(users.length == 1) {
          //var user = users[0];

          req.db.Site.find({where: {id: user.SiteId}})
          //user.getSites({limit:1})
          .success(function(site) {
            //if(sites.length == 1) {
              //var site = sites[0];
              var h1sha256 = crypto.createHash('sha256');

              var hash1 = site.secret + site.token;
              h1sha256.update(hash1, 'utf8');
              hash1 = h1sha256.digest('base32');

              var h2sha256 = crypto.createHash('sha256');
              var myHash2 = user.deviceToken + hash1;
              h2sha256.update(myHash2);
              myHash2 = h2sha256.digest('base32');

              if(myHash2 == hash2) {
                console.log('hashes match');
                var hash3 = site.secret + site.secret + userSecret;
                var auth = req.db.Authentication.build({
                  rqr: rqr,
                  authenticated: true,
                  hash3: hash3
                });

                auth.save().success(function(auth) {
                  console.log('auth saved');
                  return res.send('done');
                })
                .error(function(err) {
                  console.log('error auth');
                  return res.send('Error authenticating');
                });
              } else {
                console.log('auth error');
                return res.send('Authentication error');
              }
            //} else {
            //  return res.send('Not registered to a site. This is bad?!??!?!');
            //};
          })
          .error(function(err) {
            return res.send('Error retrieving site')
          });
        //} else {
        //  return res.send('Invalid user token');
        //};
      })
      .error(function(err) {
        return res.send('Error retrieving user');
      });
    }
  }

};

module.exports = Users;
