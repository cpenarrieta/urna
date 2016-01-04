var contants = require('../../constants');
var User = require('../models/userModel');
var Q = require('q');

var findAll = Q.nbind(User.find, User);
var findUser = Q.nbind(User.findOne, User);
var createUser = Q.nbind(User.create, User);

module.exports = {

  keepalive: function (req, res, next){
    res.status(200).json({message: "all ok from the server"});
  },

  getUsers: function(req, res, next){
    findAll()
      .then(function(users){
        res.status(200).json(users);
      })
      .fail(function(error){
        next(error);
      });
  },

  findByLinkedInId: function(id){
    return findUser({linkedinId: id});
  },

  create: function(user){
    return createUser(user);
  },
};