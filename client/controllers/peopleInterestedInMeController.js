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
        console.log('error from PeopleInterestedInMeController.initializePeopleInterestedInMe',error);
      });
  };

  $scope.remove = function(index){
    //TODO update database here to not show this person again
    $scope.data.usersInterestedInMe.splice(index, 1);
  };

  initializePeopleInterestedInMe();
});