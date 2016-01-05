angular.module('urna.peopleWithSharedInterests', [])
.controller('PeopleWithSharedInterestsController', function ($scope, $window, $location, $rootScope, Users) {
  $scope.data = {};

  var initializeUsersWithSharedInterests = function() {
    var interests = { id: $rootScope.user._id, interests: $rootScope.user.interests };
    Users.peopleWithSharedInterests(interests)
      .then(function(usersWithSharedInterests){
        $scope.data.usersWithSharedInterests = usersWithSharedInterests;
      })
      .catch(function (error) {
        console.log('error from UserController.initializeUsersWithSharedInterests',error);
      });
  };

  initializeUsersWithSharedInterests();
});