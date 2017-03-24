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
    function getLibrary(){
      $http({
        method: 'GET',
        url: 'http://localhost' + '/getLibrary/',
        params: {userId: sessionStorage.getItem('userName') }
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