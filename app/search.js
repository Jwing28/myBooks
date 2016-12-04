var myApp = angular.module('myApp',[]);

var myController = function () {}

//this should serve as parent component for renderBooks component
var searchHeaderController  = function($scope, bookFactory) {
  this.search="Find your books here:"; 
  $scope.userSearch = ""

  this.getBooks = function () {
    console.log('user query', $scope.userSearch);
    bookFactory.getBooks()
      .success(function(data){
        //need to pass this data to child component, renderBooks...
        console.log('now our data is in searchHeaderController', data);
      })
      .error(function(err){
        console.log('err infactory',err);
      }); 
  }
}

//searchHeaderController - use a factory to perform a get request - done
  //searchHeaderController will pass the data to child component renderBooks
  //renderBooks will render the books.

var myBookFactory = function ($http) {
  var result = {};
  var getBooks = function() {
    return $http.get('https://www.googleapis.com/books/v1/volumes?q=flowers+inauthor:keyes&key=AIzaSyBvkaL_H4DJpMDXmkfHGAirW_KuVleKceg');           
  }  

  return {
    getBooks: getBooks
  }
}  

var renderBooksController = function () {

}

var renderBooksComponent = {
  require: {
    parent:'^searchHeader'
  },
  template:`
    <div>
      Component! {{ $ctrl.state }}
    </div>
  `,
  bindings:{},
  controller:[renderBooksController]
}

var searchHeaderComponent = {
  transclude: true,  
  template:`
    <div ng-transclude class="menu">
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
        <input placeholder="{{$ctrl.search}}" ng-model="userSearch" />
        <button ng-click="$ctrl.getBooks()" class="btn btn-primary" type="submit">Find Books</button>
      </div>
    </div>
  `,
  bindings: { 
    name: '@', 
    search: '@'
  },
  controller: ['$scope','bookFactory', searchHeaderController]
}

myApp.controller('myController', myController);
myApp.component('searchHeader', searchHeaderComponent);
myApp.factory('bookFactory', ['$http', myBookFactory]);
myApp.component('renderBooks', renderBooksComponent);








