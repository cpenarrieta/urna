angular.module('urna.services', [])
.factory('Users', function ($http, $location, $window) {
  
  var saveInterests = function (interests) {
    return $http({
      method: 'POST',
      url: '/api/user/interests',
      data: interests
    });
  };

  return {
    saveInterests: saveInterests,
  };
});