angular.module('urna', [
  'urna.users',
  'urna.services',
  'ngRoute'
])
.config(function ($routeProvider, $httpProvider) {
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
      controller: 'UserController'
    });

    $httpProvider.interceptors.push('AttachTokens');
})
.factory('AttachTokens', function ($window) {
  // var attach = {
  //   request: function (object) {
  //     var jwt = $window.localStorage.getItem('com.shortly');
  //     if (jwt) {
  //       object.headers['x-access-token'] = jwt;
  //     }
  //     object.headers['Allow-Control-Allow-Origin'] = '*';
  //     return object;
  //   }
  // };
  // return attach;
  return {};
})
.run(function ($rootScope, $location, Auth) {
  // $rootScope.$on('$routeChangeStart', function (evt, next, current) {
  //   if (next.$$route && next.$$route.authenticate && !Auth.isAuth()) {
  //     $location.path('/signin');
  //   }
  // });
});