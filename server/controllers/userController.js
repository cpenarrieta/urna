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

  addInterests: function(req, res, next){
    var userId = req.body.id;
    var interests = req.body.interests;

    findUser({ _id : userId })
      .then(function(user){
        if (user){
          user.interests = interests;
          user.save();
          return res.sendStatus(200);
        } else {
          return res.sendStatus(400);
        }
      })
      .fail(function (error) {
        next(error);
      });
  }
};