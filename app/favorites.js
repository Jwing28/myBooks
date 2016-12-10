var favorites = angular.module('myFavorites',[]);
var favoritesCtrl = function () {}
var renderFavoritesController = function ($scope) {

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      //var user = firebase.auth().currentUser;
      //var userBookListRef = firebase.database().ref('users/' + user.uid);

      $scope.bookList = "";
      //booklist being watched and on change it will update with changed list
      userBookListRef.on('value', function(snapshot) {    
        $scope.bookList = snapshot.val();//snapshot is our updated list
      });      
    } else {
      // No user is signed in.
      console.error('no user is signed in');
    }
  });  

  this.removeFavorite = function(bookTitle) {    
    var user = firebase.auth().currentUser;    
    firebase.database().ref('users/' + user.uid).orderByChild('title').equalTo(bookTitle).remove()
    console.log(bookTitle + ' removed!');
  }
}

var renderFavoritesComponent = {
  template:`
    <a></a>
    <div ng-repeat="book in bookList track by $index">
      <div class="card" ng-style="{float:'left', width:'30%', margin: '5px', height:'35em', 'background-color':'#fcf1d4'}">
        <div ng-style="{height: '100%', width:'100%' }">
          <img class="card-img-top" ng-src="{{ book.book_picture }}" alt="Card image cap">
          <div class="card-block">
            <h4 class="card-title">Title: {{ book.title }}</h4>
            <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            <p class="card-text">Published: {{ book.published }}</p>
            <a href="#" ng-click="$ctrl.removeFavorite(book.title)" class="btn btn-primary">Add to Favorites</a> 
            <p>Count:{{ $index }}</p>
          </div>
        </div>
      </div>    
    </div>
  `,
  controller: ['$scope', renderFavoritesController]
}

favorites.controller('myFavoritesCtrl',favoritesCtrl);
favorites.component('renderFavorites',renderFavoritesComponent);


