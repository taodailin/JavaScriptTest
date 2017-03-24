(function(){
  'use strict';
  angular
    .module('index')
    .controller('signUpController', signUpController)

  signUpController.$inject = ['$http','$scope','$uibModalInstance','$rootScope'];
    
  function signUpController ($http,$scope,$uibModalInstance,$uibModal,$log,$rootScope) {
    $scope.close = close;
    $scope.submit = submit;
    $scope.submitted = false;
    function submit(){
            $http({
          method: 'POST',
          url: 'http://localhost' + '/signUp',
          data :{                  
            firstName: $scope.firstName,
            lastName: $scope.lastName,
            email: $scope.email,
            password: $scope.password,
            userName:$scope.user
          }
        }).then(function(object) {
          if(object.data == "logged in"){
            // gotoSongs();
            alert('User registered successfully');
            close();
          }
        })
     
    }
    
    function close(){
      $uibModalInstance.dismiss('cancel');
    }
  }
})()