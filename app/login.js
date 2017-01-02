var myLogin = angular.module('myLogin',[]);
var loginController = function ($scope) {}

var login = function ($scope) {
  //all of these work
  this.emailSignup = "";
  this.passwordSignup = "";
  this.emailLogin = "";
  this.passwordLogin = "";
  $scope.signup = {error:''};
  $scope.login = {error:''};

  //if user successfully signs in or logs in, 
  //send the email to search.js so you can render the user's email there
    //result: 'User: name@email.com'

  this.login = function () {
    //persist emailLogin for current user's session
    window.sessionStorage.setItem('user', this.emailLogin);

    firebase.auth().signInWithEmailAndPassword(this.emailLogin, this.passwordLogin).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;

      $scope.$apply(function(){
        $scope.login.error = error.message;
      });      
      console.log('Error code: ' + errorCode + "Msg: " + errorMessage);
    });
  }

  this.signUp = function () {
    //could have check on inputs here..
    // firebase auth
    firebase.auth().createUserWithEmailAndPassword(this.emailSignup, this.passwordSignup).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      
      $scope.$apply(function(){
        $scope.signup.error = error.message;
      });

      console.log('Error code: ' + errorCode + "Msg: " + errorMessage);
    });  
  }
}

var loginComponent = {
  templateUrl:'./templates/login.template.html'
,
  controller: ['$scope', login]
}

myLogin.controller('myLoginCtrl',loginController);
myLogin.component('userLogin', loginComponent);





