var myApp = angular.module('myApp',[]);

function myController ($scope) {
  $scope.test = 'hello';
}

function getSuccess(data) {
  console.log('result data', data);
}

function getError(err) {
  console.log('An error has occurred: ', err);
}

function searchHeaderController ($scope, $http) {
  this.search="type something"; 
  $scope.hello = ""

  this.getBooks = function () {
    console.log($scope.hello);//use this in your get request...

    //test get, in this case hardcoded
    $http.get('https://www.googleapis.com/books/v1/volumes?q=flowers+inauthor:keyes&key=AIzaSyBvkaL_H4DJpMDXmkfHGAirW_KuVleKceg')
      .then(getSuccess,getError);
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
        <button ng-click="$ctrl.getBooks()" class="btn btn-primary" type="submit">Find Books</button>
      </div>
    </div>
  `,
  bindings: { 
    name: '@', 
    search: '@'
  },
  controller: ['$scope', '$http', searchHeaderController]
}

myApp.controller('myController', ['$scope', myController]);

myApp.component('searchHeader', searchHeaderComponent);








