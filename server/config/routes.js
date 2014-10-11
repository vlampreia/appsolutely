module.exports = function(app, db) {

  function injectDb(req, res, next) {
    req.db = db;
    next();
  };
  
  app.post('/givememoney', function(req, res, next) {
    res.send('give me money now omnomnom');
  });
};
