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
      $stateProvider
      .state('library', {
        url: "/library",
        templateUrl: '/includes/library.html',
        controller: 'libraryController'
      })
      $stateProvider
      .state('artist', {
        url: "/artist",
        templateUrl: '/includes/artist.html',
        controller: 'artistController'
      })
      $stateProvider
      .state('artistSongs', {
        url: "/artistSongs/:id",
        templateUrl: '/includes/artist-song.html',
        controller: 'getArtistSongController'
      })
  }
  init.$inject = ['$rootScope', '$state', '$timeout'];
  function init ($rootScope, $state, $timeout) {
    $rootScope.baseUrl = "http://localhost";
  }
}) ()