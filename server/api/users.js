var crypto = require('crypto');

var Users = function() {

  return {
    registerUser: function(req, res, next) {
      var regCode = req.body.regCode;
      var siteToken = req.body.siteToken;
    	var userSecret = req.body.userSecret;

      //TODO: CREATE SECRET
      //var userSecret = 'dolphins';

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
      var regCode = req.body.regCode;
      var deviceCode = req.body.deviceCode;

      req.db.Registration.find({where: {regCode: regCode}})
      .success(function(registration) {
          var registration = registrations[0];

          req.db.Site.find({where: {token: registration.siteToken}})
          .success(function(site) {
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
          })
          .error(function(err) {
            return res.send('Error retrieving site');
          });
      })
      .error(function(err) {
        res.send('Error retrieving registration');
      });
    },

		isRegistered: function(req, res, next) {
			var regCode = req.body.regCode;
			req.db.Registration.find({where:{regCode:regCode}})
			.success(function(registration) {
				req.db.User.find({where:{secret:registration.userSecret}})
				.success(function(user) {
					req.send('success');
				}).error(function(err) {
					req.send('');
				});
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
					return res.send('no fuck off');
        };
      })
      .error(function(err) {
        //return res.send('Error retrieving authentication');
				res.send('');
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
              var h1sha256 = crypto.createHash('md5');

              var hash1 = site.secret + site.token;
              h1sha256.update(hash1, 'utf8');
              hash1 = h1sha256.digest('hex');

              var h2sha256 = crypto.createHash('md5');
              var myHash2 = user.deviceToken + hash1;
              h2sha256.update(myHash2);
              myHash2 = h2sha256.digest('hex');

							console.log('myhash2: ', myHash2, ' hash2: ', hash2);

              if(myHash2 == hash2) {
                console.log('hashes match');
                var hash3 = site.secret + site.token + userSecret;
								var h = crypto.createHash('md5');
								h.update(hash3, 'utf8');
								hash3 = h.digest('hex');

                var auth = req.db.Authentication.build({
                  rqr: rqr,
                  authenticated: true,
                  hash3: hash3
                });

                auth.save().success(function(auth) {
                  console.log('auth saved');
                  return res.send('success');
                })
                .error(function(err) {
                  console.log('error auth');
                  return res.send('Error authenticating');
                });
              } else {
                console.log('auth error');
								var auth = req.db.Authentication.build({
									rqr: rqr,
									authenticated: false,
									hash3: ' '
								});
								auth.save().success(function(auth) {
                	return res.send('Authentication error');
								});
              };
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
