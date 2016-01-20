angular.module('urna', [
  'urna.users',
  'urna.chat',
  'urna.peopleInterestedInMe',,
  'urna.peopleWithSharedInterests',
  'urna.services',
  'ngRoute',
  'firebase'
])
.config(function ($routeProvider, $httpProvider) {
  var checkLoggedin = function($q, $http, $location, $rootScope){
    var deferred = $q.defer();

    $http.get('/api/loggedin').success(function(user){
      if (user !== '0'){
        $rootScope.user = user;
        deferred.resolve();
      } else {
        deferred.reject();
        $location.url('/login');
      }
    });

    return deferred.promise;
  };

  $routeProvider
    .when('/', {
      templateUrl: 'login.html',
      controller: 'UserController'
    })
    .when('/login', {
      templateUrl: 'login.html',
      controller: 'UserController'
    })
    .when('/profile', {
      templateUrl: 'profile.html',
      controller: 'UserController',
      resolve: { loggedin: checkLoggedin }
    })
    .when('/interestedInMe', {
      templateUrl: 'interestedInMe.html',
      controller: 'PeopleInterestedInMeController',
      resolve: { loggedin: checkLoggedin }
    })
    .when('/urna', {
      templateUrl: 'urna.html',
      controller: 'PeopleWithSharedInterestsController',
      resolve: { loggedin: checkLoggedin }
    })
    .when('/chat/:id1/:id2', {
      templateUrl: 'chat.html',
      controller: 'ChatController',
      resolve: { loggedin: checkLoggedin }
    })
    .otherwise({
      redirectTo: '/login'
    });
});