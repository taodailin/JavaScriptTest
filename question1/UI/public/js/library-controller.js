(function(){
  'use strict';
  angular
    .module('index')
    .controller('libraryController', libraryController)

  libraryController.$inject = ['$http','$scope','$rootScope','$state'];
    
  function libraryController ($http,$scope,$rootScope,$state) {
    if (sessionStorage.getItem('userName') == null ){
      alert("Please login to view this Page");
      $state.go('login');
    }
    getLibrary();
     $scope.logout = logout;
    $scope.getAllArtistgetAllArtist=getAllArtist;
    $scope.getAllSongs=getAllSongs;
    $scope.getLibrary=getLibrary;
    $scope.remove=remove;
    function getLibrary(){
      $http({
        method: 'GET',
        url: 'http://localhost' + '/getLibrary/',
        params: {userId: sessionStorage.getItem('userName') }
      }).then(function(object) {
        $scope.library = object.data;

      })
    }

   
    function remove(id){
         $http({
          method: 'POST',
          url: 'http://localhost' + '/deleteSongFromLibrary',
          data :{                  
            userName: sessionStorage.getItem('userName')  ,
            songId: id
          }
        }).then(function(object) {
          if(object.data == "deleted"){
            // gotoSongs();
            alert('Song deleted successfully');
            getLibrary();
          }
        })
    }
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
})()