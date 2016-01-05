angular.module('urna.services', [])
.factory('Users', function ($http, $location, $window) {
  
  var saveInterests = function (interests) {
    return $http({
      method: 'POST',
      url: '/api/users/interests',
      data: interests
    });
  };

  var interestedInMe = function(userId) {
    return $http({
      method: 'POST',
      url: '/api/users/interestedInMe',
      data: userId
    })
    .then(function (usersInterestedInMe) {
      return usersInterestedInMe.data;
    });
  };

  var peopleWithSharedInterests = function(interests){
    return $http({
      method: 'POST',
      url: '/api/users/sharedInterests',
      data: interests
    })
    .then(function (usersWithSharedInterests) {
      return usersWithSharedInterests.data;
    });
  };

  var imInterestInYou = function(request){
    return $http({
      method: 'POST',
      url: '/api/users/imInterestInYou',
      data: request
    });
  };

  var imNotInterestInYou = function(request){
    return $http({
      method: 'POST',
      url: '/api/users/imNotInterestInYou',
      data: request
    });
  };

  return {
    saveInterests: saveInterests,
    interestedInMe: interestedInMe,
    peopleWithSharedInterests: peopleWithSharedInterests,
    imInterestInYou: imInterestInYou,
    imNotInterestInYou: imNotInterestInYou
  };
});