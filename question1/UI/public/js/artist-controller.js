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
    fetchArtist();
     $scope.logout = logout;
    $scope.getAllArtist=getAllArtist;
    $scope.getAllSongs=getAllSongs;
    $scope.getLibrary=getLibrary;
    $scope.getArtistSongs=getArtistSongs;
    function fetchArtist(){
      $http({
        method: 'GET',
        url: 'http://localhost' + '/getArtists'
      }).then(function(object) {
        $scope.artists = object.data;

      })
    }

   
    function getArtistSongs(artistId){
      $state.go('artistSongs',{id:artistId})
    }
     function logout(){
      sessionStorage.clear();
      $state.go('login');
    }
    function getLibrary(){
      $state.go('library');
    }
    function getAllArtist(){
      $state.go('artist');
    }
    function getAllSongs(){
      $state.go('list');
    }
  }
})()