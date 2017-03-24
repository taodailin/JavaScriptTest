(function(){
  'use strict';
  angular
    .module('index')
    .controller('songController', songController)

  songController.$inject = ['$http','$scope','$rootScope','$state'];
    
  function songController ($http,$scope,$rootScope,$state) {
    if (sessionStorage.getItem('userName') == null ){
      alert("Please login to view this Page");
      $state.go('login');
    }
    getSongs();
    $scope.logout = logout;
    $scope.getAllArtist=getAllArtist;
    $scope.getAllSongs=getAllSongs;
    $scope.getLibrary=getLibrary;
    $scope.addSong=addSong;
    function getSongs(){
      $http({
        method: 'GET',
        url: 'http://localhost' + '/getSongs'
      }).then(function(object) {
        $scope.songs = object.data;

      })
    }

    
    function addSong(id){
       $http({
          method: 'POST',
          url: 'http://localhost' + '/addSongToLibrary',
          data :{                  
            userName: sessionStorage.getItem('userName')  ,
            songId: id
          }
        }).then(function(object) {
          if(object.data == "inserted"){
            // gotoSongs();
            alert('Song Added successfully');
            getSongs();
          }
          else{
            alert('Song already in library');
          }
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