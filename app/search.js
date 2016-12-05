var myApp = angular.module('myApp',[]);
var myController = function () {}

var searchHeaderController  = function($rootScope, bookFactory) {
  this.search=""; 
  $rootScope.result = {items: []};

  this.getBooks = function () {
    bookFactory.returnBooks( this.search )
      .success(function(data){
        $rootScope.result.items = data.items;
      })
      .error(function(err){
        console.log('err infactory',err);
      }); 
  }
}

//searchHeaderController - use a factory to perform a get request - done
  //searchHeaderController will pass the data to child component renderBooks-done
  //renderBooks will render the books.

var myBookFactory = function ($http) {
  var returnBooks = function(userInput) {
    return $http.get('https://www.googleapis.com/books/v1/volumes?q=' + userInput + ':keyes&key=AIzaSyBvkaL_H4DJpMDXmkfHGAirW_KuVleKceg');           
  }  

  return {
    returnBooks: returnBooks
  }
}  

var renderBooksController = function ($rootScope) {
  $rootScope.$watch('result["items"]', function (newValue, oldValue, scope) {
    if(newValue.length){
      console.log('inside renderBooks', newValue);
    }    
  });
}

var renderBooksComponent = {
  template:`
    <div></div>
  `,
  controller: ['$rootScope', renderBooksController]
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
        
      <div class="container-fluid">        
        <h2>MyBooks</h2>
        <input ng-model="$ctrl.search" />
        <button ng-click="$ctrl.getBooks()" class="btn btn-primary" type="submit">Find Books</button>
        <render-Books></render-Books>
      </div>      
    </div>
  `,
  bindings: { 
    search: '@', //user's input in input box
  },
  controller: ['$rootScope','bookFactory', searchHeaderController]
}

myApp.controller('myController', myController);
myApp.component('searchHeader', searchHeaderComponent);//parent of renderBooks component
myApp.factory('bookFactory', ['$http', myBookFactory]);
myApp.component('renderBooks', renderBooksComponent); //child of searchHeader component








