var myApp = angular.module('myApp',[]);

function myController ($scope) {
  $scope.test = 'hello';
}

function searchHeaderController ($scope) {
  this.search="type something"; 
  $scope.hello = ""

  this.test = function () {
    console.log('ngclick test works');
    console.log($scope.hello);
  }
}

var searchHeaderComponent = {
  template:`
    <div class="menu">
      <div class="btn-group" role="group">
        <button id="btnGroupDrop1" type="button" class="btn btn-secondary dropdown-toggle btn btn-info" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Dropdown
        </button>
        <div class="dropdown-menu" aria-labelledby="btnGroupDrop1">
          <a class="dropdown-item" href="#">Favorites List</a>
          <a class="dropdown-item" href="#">Login/Logout</a>
        </div>
      </div>   
        
      <div class="searchBar container-fluid">        
        <h2>MyBooks</h2>
        <input placeholder="{{$ctrl.search}}" ng-model="hello" />
        <button ng-click="$ctrl.test()" class="btn btn-primary" type="submit">Find Books</button>
      </div>
    </div>
  `,
  bindings: { 
    name: '@', 
    search: '@'
  },
  controller: searchHeaderController
}

myApp.controller('myController', ['$scope', myController]);

myApp.component('searchHeader', searchHeaderComponent);