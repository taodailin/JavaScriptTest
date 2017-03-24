
(function(){
  'use strict';
  angular
    .module('index')
    .controller('loginController', loginController)

  loginController.$inject = ['$http','$scope','$rootScope','$uibModal','$state'];
    
  function loginController ($http,$scope,$rootScope,$uibModal,$state) {
    $scope.login = login;
    $scope.openSignUp = openSignUp;
    $scope.submitted = false;
    $scope.signup = false;
    function signUp(){
      $scope.signup = true;
    }
    function login(){
      if($scope.user == undefined || $scope.password == undefined){
        $scope.submitted = true;
      }
      else{ 
        submit();      
      }
    }

    function submit(){
      $http({
        method: 'POST',
        url: $rootScope.baseUrl + '/login',
        data :{                  
          emailId : $scope.user,
          password : $scope.password,
        }
      }).then(function(object) {
        if(object.data=="Invalid Credentials"){
          alert("Invalid Credentials");
        }
        else{
        sessionStorage.setItem('email',object.data.emailId);
        $state.go('list');
      }
      })
    }

    function openSignUp(){
      var modalInstance = $uibModal.open({
        templateUrl: '/includes/signup.html',
        controller: 'signUpController',
        backdrop: 'static',
        size:'sm'
      });

    }

  }
})()