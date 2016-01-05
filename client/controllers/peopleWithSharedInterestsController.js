angular.module('urna.peopleWithSharedInterests', [])
.controller('PeopleWithSharedInterestsController', function ($scope, $window, $location, $rootScope, Users) {
  $scope.data = {};

  var initializeUsersWithSharedInterests = function() {
    var request = { id: $rootScope.user._id, interests: $rootScope.user.interests };
    Users.peopleWithSharedInterests(request)
      .then(function(usersWithSharedInterests){
        $scope.data.usersWithSharedInterests = usersWithSharedInterests;
      })
      .catch(function (error) {
        console.log('error from PeopleWithSharedInterestsController.initializeUsersWithSharedInterests',error);
      });
  };

  initializeUsersWithSharedInterests();

  $scope.imInterestInYou = function(userImInterestInId){
    var request = { id: $rootScope.user._id, userImInterestInId: userImInterestInId };
    Users.imInterestInYou(request)
      .then(function(){
        console.log('imInterestInYou done');
        //TODO show message saying we will notify you once agreement
      })
      .catch(function (error) {
        console.log('error from PeopleWithSharedInterestsController.imInterestInYou',error);
      });
  };

  $scope.imNotInterestInYou = function(userImNotInterestInId){
    var request = { id: $rootScope.user._id, userImNotInterestInId: userImNotInterestInId };
    Users.imNotInterestInYou(request)
      .then(function(){
        console.log('imNotInterestInYou done');
        //TODO remove element from ui
      })
      .catch(function (error) {
        console.log('error from PeopleWithSharedInterestsController.imNotInterestInYou',error);
      });
  };
});