angular.module('urna.chat', [])
.controller('ChatController', function($scope, $firebaseArray, $routeParams, $rootScope, $location){
  var userId1 = $routeParams.id1;
  var userId2 = $routeParams.id2;

  var ref1 = new Firebase("https://urna.firebaseio.com/" + userId1 + "-" + userId2);
  var ref2 = new Firebase("https://urna.firebaseio.com/" + userId2 + "-" + userId1);
  var ref;

  ref1.once("value", function(snapshot) {
    if (snapshot.exists()) {
      ref = ref1;
      $scope.messages = $firebaseArray(ref);
    } else {
      ref2.once("value", function(snapshot2) {
        if (snapshot2.exists()) {
          ref = ref2;
          $scope.messages = $firebaseArray(ref);
        } else {
          $location.path('/');
        }
      });
    }
  });

  $scope.addMessage = function() {
    var username = $rootScope.user.name;
    var message = $scope.newMessageText;

    if (message.trim().length === 0){
      return;
    }

    $scope.newMessageText = '';
    $scope.messages.$add({
      username: username,
      text: message
    });
  };

  $scope.emptyOrNull = function(item){
    return item.text !== undefined;
  };
});