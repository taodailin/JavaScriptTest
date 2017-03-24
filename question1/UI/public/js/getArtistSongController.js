(function(){
  'use strict';
  angular
    .module('index')
    .controller('getArtistSongController', getArtistSongController)

  getArtistSongController.$inject = ['$http','$scope','$rootScope','$state'];

    
  function getArtistSongController ($http,$scope,$rootScope,$state) {
    if (sessionStorage.getItem('userName') == null ){
      alert("Please login to view this Page");
      $state.go('login');
    }
    getArtistSong($state.params.id);
     $scope.logout = logout;
    $scope.getAllArtist=getAllArtist;
    $scope.getAllSongs=getAllSongs;
    $scope.getLibrary=getLibrary;
    function getArtistSong(id){
      $http({
        method: 'GET',
        url: 'http://localhost' + '/getartistSong/',
        params: {artistId: id }
      }).then(function(object) {
        $scope.artistSongs = object.data;

      })
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