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

  return {
    saveInterests: saveInterests,
    interestedInMe: interestedInMe
  };
});