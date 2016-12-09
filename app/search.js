var myApp = angular.module('myApp',[]);
var myController = function () {}
var database = firebase.database();// reference to database
console.log(database);
//console.log( window.sessionStorage.getItem('user') ) works

// write to firebase DB
var writeUserData = function(userId, bookObj, bookIndex) {
  firebase.database().ref('users/' + userId).set({
    title: bookObj.volumeInfo.title,
    count: bookIndex,
    published: bookObj.volumeInfo.publishedDate,
    book_picture : bookObj.volumeInfo.imageLinks.smallThumbnail
  });
}  

var searchHeaderController  = function($rootScope,$scope, bookFactory) {
  this.search=""; 
  $rootScope.result = {items: []};
  $scope.currentUser = window.sessionStorage.getItem('user');

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

  this.addToFavor = function (bookIndex) {
    //this is where you store the selection for the user in the db
    var user = firebase.auth().currentUser;
    if (user != null) {
      writeUserData(user.uid, $rootScope.result.items[bookIndex], bookIndex);
      console.log('added book!');
    }
  }

  $rootScope.$watch('result["items"]', function (newValue, oldValue, scope) {
    if(newValue.length){
      $scope.list = newValue;
      console.log('scope list', $scope.list);
    }    
  });
}
 
 //at <a></a> add to favorites - this is where you'll have to somehow add the given book  
var renderBooksComponent = {
  template:`
    <div class="card-deck-wrapper">
      <div class="card-deck">
        <div ng-repeat="book in list track by $index">  
          <div class="card" ng-style="{float:'left', width:'30%', margin: '5px', height:'35em', 'background-color':'#fcf1d4'}">
            <div ng-style="{height: '100%', width:'100%' }">
              <img class="card-img-top" ng-src="{{ book.volumeInfo.imageLinks.smallThumbnail }}" alt="Card image cap">
              <div class="card-block">
                <h4 class="card-title">Title: {{ book.volumeInfo.title }}</h4>
                <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                <p class="card-text">Published: {{ book.volumeInfo.publishedDate }}</p>
                <a href="#" ng-click="$ctrl.addToFavor($index)" class="btn btn-primary">Add to Favorites</a> 
                <p>Count:{{ $index }}</p>
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
      <div class="btn-group" role="group" ng-style="{display:'inline'}">
        <button id="btnGroupDrop1" type="button" class="btn btn-secondary dropdown-toggle btn btn-info" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Dropdown
        </button>
        <div class="dropdown-menu" aria-labelledby="btnGroupDrop1">
          <a class="dropdown-item" href="#">Favorites List</a>
          <a class="dropdown-item" href="./login.html">Login/Logout</a>
        </div>
      </div>   

      <div ng-bind="'Hi, ' + currentUser + '!'" ng-style="{float:right, marginLeft:'15px'}"></div>        
        
      <div class="container-fluid" ng-style="{width:'1100px', marginLeft:'20%'}">        
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
  controller: ['$rootScope','$scope', 'bookFactory', searchHeaderController]
}

myApp.controller('myController', myController);
myApp.component('searchHeader', searchHeaderComponent);//parent of renderBooks component
myApp.factory('bookFactory', ['$http', myBookFactory]);
myApp.component('renderBooks', renderBooksComponent); //child of searchHeader component








