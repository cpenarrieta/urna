angular.module('urna.users', [])
.controller('UserController', function ($scope, $window, $location, $rootScope, Users) {
  $scope.saveInterests = function () {
    var interests = { id: $rootScope.user._id, interests: $rootScope.user.interests };
    Users.saveInterests(interests)
      .then(function(){
        console.log('interests saved');
      })
      .catch(function (error) {
        console.log('error from UserController.saveInterests',error);
      });
  };
});
