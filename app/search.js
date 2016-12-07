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

var myBookFactory = function ($http) {
  var returnBooks = function(userInput) {
    return $http.get('https://www.googleapis.com/books/v1/volumes?q=' + userInput + ':keyes&key=AIzaSyBvkaL_H4DJpMDXmkfHGAirW_KuVleKceg');           
  }  

  return {
    returnBooks: returnBooks
  }
}  

var renderBooksController = function ($rootScope, $scope) {
  //this function isn't run when ng-repeat is up
  $scope.list = [];

  $rootScope.$watch('result["items"]', function (newValue, oldValue, scope) {
    if(newValue.length){
      $scope.list = newValue;
      console.log('scope list', $scope.list);
    }    
  });
}
  
var renderBooksComponent = {
  template:`
    <div class="card-deck-wrapper">
      <div class="card-deck">
        <div ng-repeat="book in list">  
          <div class="card" ng-style="{float:'left', width:'30%', margin: '5px', height:'35em', 'background-color':'#fcf1d4'}">
            <div ng-style="{height: '100%', width:'100%' }">
              <img class="card-img-top" ng-src="{{ book.volumeInfo.imageLinks.smallThumbnail }}" alt="Card image cap">
              <div class="card-block">
                <h4 class="card-title">Title: {{ book.volumeInfo.title }}</h4>
                <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                <p class="card-text">Published: {{ book.volumeInfo.publishedDate }}</p>
                <a href="#" class="btn btn-primary">Add to Favorites</a>
              </div>
            </div>
          </div>
        </div> 
      </div>       
    </div>   
  `,
  controller: ['$rootScope', '$scope', renderBooksController]
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
          <a class="dropdown-item" href="./login.html">Login/Logout</a>
        </div>
      </div>   
        
      <div class="container-fluid">        
        <h2>MyBooks</h2>
        <input ng-model="$ctrl.search" />
        <button ng-click="$ctrl.getBooks()" class="btn btn-primary" type="submit">Find Books</button>
        <hr>
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








