(function(){
  angular.module('index', ['ui.router','ui.bootstrap','ngMessages'])
  .config(config)
  .run(init);
  config.$inject = ['$stateProvider','$urlRouterProvider'];
  function config($stateProvider,$urlRouterProvider){
    $urlRouterProvider.otherwise("/");

      $stateProvider
      .state('login', {
        url: "/",
        templateUrl: '/includes/login.html',
        controller: 'loginController'
      })
      $stateProvider
      .state('list', {
        url: "/list",
        templateUrl: '/includes/song-list.html',
        controller: 'songController'
      })
  }
  init.$inject = ['$rootScope', '$state', '$timeout'];
  function init ($rootScope, $state, $timeout) {
    $rootScope.baseUrl = "http://localhost";
  }
}) ()