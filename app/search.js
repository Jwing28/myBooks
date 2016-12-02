var myApp = angular.module('myApp',[]);

myApp.controller('myController', ['$scope', function($scope) {
  $scope.test = 'hello';

}]);


myApp.component('abc', {
  templateUrl:'/app/templates/search.template.html',
  bindings: { name: '@'}
});