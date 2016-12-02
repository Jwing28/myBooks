var myApp = angular.module('myApp',[]);

myApp.controller('myController', ['$scope', function($scope) {
  $scope.test = 'hello';
  
}]);