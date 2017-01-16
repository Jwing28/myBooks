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
  templateUrl:'./templates/favorites.template.html'
  ,
  controller: ['$scope', '$firebaseObject',renderFavoritesController]
}

favorites.controller('myFavoritesCtrl',favoritesCtrl);
favorites.component('test',renderFavoritesComponent);




