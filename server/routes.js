var userController = require('./controllers/userController');
var helpers = require('./helpers');
var passport = require('./passportConf');

var isAuthenticated = function(req, res, next){
  if (!req.isAuthenticated())
    res.sendStatus(401);
  else
    next();
};

module.exports = function (app, express) {
  app.get('/api/testdata', userController.insertTestData);

  app.get('/api/keepalive', function(req, res){
    res.status(200).json({message: "all ok from the server"});
  });

  app.get('/api/users/', userController.getUsers);
  app.post('/api/users/interests', userController.addInterests);
  app.post('/api/users/interestedInMe', userController.interestedInMe);
  app.post('/api/users/sharedInterests', userController.sharedInterests);
  app.post('/api/users/imInterestInYou', userController.imInterestInYou);
  app.post('/api/users/imNotInterestInYou', userController.imNotInterestInYou);

  app.get('/api/auth/linkedin',
    passport.authenticate('linkedin'),
    function(req, res){
    }
  );

  app.get('/api/auth/linkedin/callback',
    passport.authenticate('linkedin', { failureRedirect: '/#/login' }),
    function(req, res) {
      res.redirect('/#/profile');
    }
  );

  app.get('/api/loggedin', function(req, res) {
    res.send(req.isAuthenticated() ? req.user : '0');
  });

  app.get('/api/logout', function(req, res){
    req.logout();
    res.redirect('/#/login');
  });

  app.use(helpers.errorLogger);
  app.use(helpers.errorHandler);
};