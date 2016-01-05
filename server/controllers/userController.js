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
  },

  interestedInMe: function(req, res, next){
    var userId = req.body.id;
    if (!userId){
      res.sendStatus(400);
    }

    findAll({
      peopleInterested: userId
    })
    .then(function(users){
      res.status(200).json(users);
    })
    .fail(function(error){
      next(error);
    });
  },

  sharedInterests: function(req, res, next){
    var userId = req.body.id;
    var interests = req.body.interests;

    if (!userId || !interests){
      res.sendStatus(400);
    }

    var orCondition = [];
    for (var i=0; i<interests.length; i++){
      if (interests[i] && interests[i] !== ""){
        orCondition.push({ interests: interests[i]});
      }
    }

    findAll({
      _id: { $ne: userId },
      $or: orCondition
    })
    .then(function(usersWithSharedInterests){
      res.status(200).json(usersWithSharedInterests);
    })
    .fail(function(error){
      next(error);
    });
  },

  imInterestInYou: function(req, res, next){
    var userId = req.body.id;
    var userImInterestInId = req.body.userImInterestInId;
    var myUser;

    findUser({ _id: userId })
      .then(function(user){
        if (user){
          myUser = user;
          return findUser({ _id: userImInterestInId });
        } else {
          res.sendStatus(400);
        }
      })
      .then(function (userImInterestIn){
        if (userImInterestIn){
          myUser.peopleInterested.push(userImInterestIn);
          myUser.save();
          res.sendStatus(200);
        } else {
          res.sendStatus(400);
        }
      })
      .fail(function (error) {
        next(error);
      });
  },

  insertTestData: function(req, res, next){
    var myUser = findUser({ _id: "568b37fc7fe4236f47cf2bb5"})
      .then(function(user){
        createUser({
          linkedinId: "1",
          email: "test@test.com",
          name: "Tim Cook",
          picture: "http://images.apple.com/pr/bios/images/cook_thumb.jpg",
          publicProfileUrl: "https://www.linkedin.com/in/cpenarrieta",
          headline: "CEO Apple",
          summary: "Tim Cook is the CEO of Apple and serves on its Board of Directors.",
          location: "San Francisco",
          interests: ["react", "android", ""],
          peopleInterested: [user]
        })
        .then(function(newUser){
        })
        .fail(function (error) {
          next(error);
        });

        createUser({
          linkedinId: "2",
          email: "test@test.com",
          name: "Jonathan Ive",
          picture: "http://images.apple.com/pr/bios/images/ive_thumb20110204.jpg",
          publicProfileUrl: "https://www.linkedin.com/in/cpenarrieta",
          headline: "Chief Design Officer Apple",
          summary: "Jonathan Ive is Apple’s Chief Design Officer, reporting to CEO Tim Cook.",
          location: "San Francisco",
          interests: ["swift", "mongo db", "design for dummies"],
        })
        .then(function(newUser){
        })
        .fail(function (error) {
          next(error);
        });

        createUser({
          linkedinId: "3",
          email: "test@test.com",
          name: "Philip Schiller",
          picture: "http://images.apple.com/pr/bios/images/schiller_thumb20110204.jpg",
          publicProfileUrl: "https://www.linkedin.com/in/cpenarrieta",
          headline: "Senior Vice President of Worldwide Marketing Apple",
          summary: "Philip Schiller is Apple’s senior vice president of Worldwide Marketing reporting to CEO Tim Cook.",
          location: "San Francisco",
          interests: ["javascript", "marketing 101", "swift"],
        })
        .then(function(newUser){
        })
        .fail(function (error) {
          next(error);
        });

        createUser({
          linkedinId: "4",
          email: "test@test.com",
          name: "Eddy Cue",
          picture: "http://images.apple.com/pr/bios/images/1501cue_thumb.jpg",
          publicProfileUrl: "https://www.linkedin.com/in/cpenarrieta",
          headline: "Senior Vice President of Internet Software and Services Apple",
          summary: "Eddy Cue is Apple's senior vice president of Internet Software and Services, reporting to CEO Tim Cook.",
          location: "San Francisco",
          interests: ["javascript", "marketing 101", ""],
          peopleInterested: [user]
        })
        .then(function(newUser){
          return res.json(newUser);
        })
        .fail(function (error) {
          next(error);
        });

        return res.sendStatus(200);
      });
  }
};