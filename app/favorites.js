var favorites = angular.module('myFavorites',['firebase']);
var favoritesCtrl = function () {}

var renderFavoritesController = function ($scope, $firebaseObject) {
  $scope.bookList = [];
  $scope.users = {}; 
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

  this.removeFavorite = function(bookTitle) {
    var ref = firebase.database().ref();   
    $scope.users = $firebaseObject(ref);

    //located and removed book from ui 
    $scope.bookList.forEach(function(book,bookIndex) {
      if(book.title === bookTitle){
        $scope.bookList.splice(bookIndex,1);
      }
    });
    
    // loading firebase data is async!
    $scope.users.$loaded()
      .then(function(data) {
        for (var key in data.users) {
          for (var uniqueId in data.users[key]) {
            for (var bookProp in data.users[key][uniqueId]) {
              if(bookProp === 'title' && data.users[key][uniqueId][bookProp] === bookTitle) {
                delete data.users[key][uniqueId];
                
                //update firebase w/ change
                $scope.users.$save()
                  .then(function(ref) {
                    console.log('book removed!');
                  },function(error) {
                    console.log('unable to save to database', error);
                  });
              }
            }
          }
        }
      })
      .catch(function(error) {
        console.log('error loading firebase data', error);
      });        
  }
}

var renderFavoritesComponent = {
  template:`
    <a>My Favorites</a>
    <div ng-repeat="(key, book) in bookList track by $index">
      <div class="card" ng-style="{float:'left', width:'30%', margin: '5px', height:'35em', 'background-color':'#fcf1d4'}">
        <div ng-style="{height: '100%', width:'100%' }">
          <img class="card-img-top" ng-src="{{ book.book_picture }}" alt="Card image cap">
          <div class="card-block">
            <h4 class="card-title">Title: {{ book.title }}</h4>
            <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            <p class="card-text">Published: {{ book.published }}</p>
            <a href="#" ng-click="$ctrl.removeFavorite(book.title)" class="btn btn-primary">Remove Book</a> 
            <p>Count:{{ $index }}</p>
          </div>
        </div>
      </div>    
    </div>
  `,
  controller: ['$scope', '$firebaseObject',renderFavoritesController]
}

favorites.controller('myFavoritesCtrl',favoritesCtrl);
favorites.component('test',renderFavoritesComponent);




