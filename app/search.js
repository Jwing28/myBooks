rvar myApp = angular.module('myApp',[]);
var myController = function () {}
var database = firebase.database();// reference to database
console.log(database);
//console.log( window.sessionStorage.getItem('user') ) works

// write to firebase DB
var writeUserData = function(userId, bookObj, bookIndex) {
  firebase.database().ref('users/' + userId).push({
    title: bookObj.volumeInfo.title,
    count: bookIndex,
    published: bookObj.volumeInfo.publishedDate,
    book_picture : bookObj.volumeInfo.imageLinks.smallThumbnail
  },
  function(reference){
    console.log("Book Added!");
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

    console.log(user);

    // if (user != null) {
    //   writeUserData(user.uid, $rootScope.result.items[bookIndex], bookIndex);
    //   console.log('added book!');
    // }else{
    //   console.error('user is null');
    // }
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
  templateUrl:'./templates/search.renderBooks.template.html'
  ,
  controller: ['$rootScope', '$scope', renderBooksController]
}

var searchHeaderComponent = {
  transclude: true,  
  templateUrl:'./templates/search.searchHeader.template.html'
  ,
  bindings: { 
    search: '@', //user's input in input box
  },
  controller: ['$rootScope','$scope', 'bookFactory', searchHeaderController]
}

myApp.controller('myController', myController);
myApp.component('searchHeader', searchHeaderComponent);//parent of renderBooks component
myApp.factory('bookFactory', ['$http', myBookFactory]);
myApp.component('renderBooks', renderBooksComponent); //child of searchHeader component








