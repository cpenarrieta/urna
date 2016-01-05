angular.module('urna.chat', [])
.controller('ChatController', function($scope){
  $scope.chats = [];

  $scope.addChat = function(){
    $scope.chats.push($scope.newChat);
    $scope.newChat = '';
  };
});