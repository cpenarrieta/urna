var userController = require('./controllers/userController');
var helpers = require('./helpers');
var passport = require('./passportConf');

var isAuthenticated = function(req, res, next){
  if (!req.isAuthenticated())
    res.send(401);
  else
    next();
};

module.exports = function (app, express) {
  app.get('/api/keepalive', function(req, res){
    res.status(200).json({message: "all ok from the server"});
  });

  app.get('/api/users/', userController.getUsers);

  app.get('/api/auth/linkedin',
    passport.authenticate('linkedin', { state: 'SOME STATE' }),
    function(req, res){
    }
  );

  app.get('/api/auth/linkedin/callback',
    passport.authenticate('linkedin', { failureRedirect: '/#/login' }),
    function(req, res) {
      res.redirect('/#/users');
    }
  );

  app.get('/api/loggedin', function(req, res) {
    res.send(req.isAuthenticated() ? req.user : '0');
  });

  app.use(helpers.errorLogger);
  app.use(helpers.errorHandler);
};