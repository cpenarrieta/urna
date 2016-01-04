angular.module('urna', [
  'urna.users',
  'urna.services',
  'ngRoute'
])
.config(function ($routeProvider, $httpProvider) {
  var checkLoggedin = function($q, $http, $location){
    var deferred = $q.defer();

    $http.get('/api/loggedin').success(function(user){
      if (user !== '0'){
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
    .when('/users', {
      templateUrl: 'users.html',
      controller: 'UserController',
      resolve: { loggedin: checkLoggedin }
    })
    .otherwise({
      redirectTo: '/login'
    });
});