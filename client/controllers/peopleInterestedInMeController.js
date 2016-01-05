angular.module('urna.peopleInterestedInMe', [])
.controller('PeopleInterestedInMeController', function ($scope, $window, $location, $rootScope, Users) {
  $scope.data = {};

  var initializePeopleInterestedInMe = function() {
    var userId = { id: $rootScope.user._id };
    Users.interestedInMe(userId)
      .then(function(usersInterestedInMe){
        $scope.data.usersInterestedInMe = usersInterestedInMe;
      })
      .catch(function (error) {
        console.log('error from UserController.interestedInMe',error);
      });
  };

  initializePeopleInterestedInMe();
});
