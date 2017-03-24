(function(){
  'use strict';
  angular
    .module('index')
    .controller('artistController', artistController)

  artistController.$inject = ['$http','$scope','$rootScope','$state'];
    
  function artistController ($http,$scope,$rootScope,$state) {
    if (sessionStorage.getItem('userName') == null ){
      alert("Please login to view this Page");
      $state.go('login');
    }
    getArtists();
    $scope.logout = logout;
    function getArtists(){
      $http({
        method: 'GET',
        url: 'http://localhost' + '/getArtists'
      }).then(function(object) {
        $scope.artists = object.data;

      })
    }

    function logout(){
      sessionStorage.clear();
      $state.go('login');
    }
    function getArtistSongs(){
        alert("hash");  
    }
  }
})()