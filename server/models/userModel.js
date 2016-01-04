var Q = require('q');
var mongoose = require('mongoose');
var contants = require('../../constants');

var UserSchema = new mongoose.Schema({
  linkedinId: {
    type: String,
    unique: true
  },
  name: String,
  email: String,
  picture: String,
  publicProfileUrl: String,
  headline: String,
  summary: String,
  location: String,
  interests: [{
    type: String,
    default: ['','','']
  }],
  peopleInterested: [{type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  peopleNotInterested: [{type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('users', UserSchema);
