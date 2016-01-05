angular.module('urna', [
  'urna.users',
  'urna.peopleInterestedInMe',
  'urna.services',
  'ngRoute'
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
    .otherwise({
      redirectTo: '/login'
    });
});