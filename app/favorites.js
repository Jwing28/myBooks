var favorites = angular.module('myFavorites',[]);
var favoritesCtrl = function () {}

var renderFavoritesController = function ($scope) {
  $scope.bookList = []; 
  // firebase loads asynchronously
  setTimeout(function() {
    var userId = firebase.auth().currentUser.uid;
    firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
      var bkObj = snapshot.val();
      var bkArr = [];
      for (var key in bkObj) {        
        bkArr.push(bkObj[key]);
      }

      $scope.$apply(function() {
        $scope.bookList = bkArr;
      });
    });    
  },500);

  //remove a favorited book from the list should setoff above..will need to fix.
  this.removeFavorite = function(bookTitle) {   
    //located and removed book from ui 
    $scope.bookList.forEach(function(book,bookIndex) {
      if(book.title === bookTitle){
        $scope.bookList.splice(bookIndex,1);
      }
    });
    // var userId = firebase.auth().currentUser.uid;
    // firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
    //   var bkObj = snapshot.val();
    //   var bkArr = [];
    //   for (var key in bkObj) {        
    //     if(bkObj[key].title === bookTitle){
    //       //this is the object we want removed from database and from screen

    //     }
    //   }

    //   $scope.$apply(function() {
    //     $scope.bookList = bkArr;
    //   });
    // });         
  }
}

var renderFavoritesComponent = {
  template:`
    <a>My Favorites</a>
    <div ng-repeat="book in bookList track by $index">
      <div class="card" ng-style="{float:'left', width:'30%', margin: '5px', height:'35em', 'background-color':'#fcf1d4'}">
        <div ng-style="{height: '100%', width:'100%' }">
          <img class="card-img-top" ng-src="{{ book.book_picture }}" alt="Card image cap">
          <div class="card-block">
            <h4 class="card-title">Title: {{ book.title }}</h4>
            <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            <p class="card-text">Published: {{ book.published }}</p>
            <a href="#" ng-click="$ctrl.removeFavorite(book.title,book)" class="btn btn-primary">Remove Book</a> 
            <p>Count:{{ $index }}</p>
          </div>
        </div>
      </div>    
    </div>
  `,
  controller: ['$scope', renderFavoritesController]
}

favorites.controller('myFavoritesCtrl',favoritesCtrl);
favorites.component('test',renderFavoritesComponent);




