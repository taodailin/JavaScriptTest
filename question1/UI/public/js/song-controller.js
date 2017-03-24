(function(){
  'use strict';
  angular
    .module('index')
    .controller('songController', songController)

  songController.$inject = ['$http','$scope','$rootScope','$state'];
    
  function songController ($http,$scope,$rootScope,$state) {
    getSongs();
    $scope.logout = logout;
    function getSongs(){
      $http({
        method: 'GET',
        url: 'http://localhost' + '/getSongs'
      }).then(function(object) {
        $scope.songs = object.data;

      })
    }

    function logout(){
      sessionStorage.clear();
      $state.go('login');
    }
  }
})()