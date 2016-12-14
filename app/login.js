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
    //result: 'User: kat@gmail.com'

    //if there is an error (wrong psw or email) then error notice will be thrown

  this.login = function () {
    //could have check on inputs here..
    window.sessionStorage.setItem('user', this.emailLogin);

    firebase.auth().signInWithEmailAndPassword(this.emailLogin, this.passwordLogin).catch(function(error) {
      // Handle Errors here.
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
    console.log('check signup', this.emailSignup + " " + this.passwordSignup)
    // firebase auth
    firebase.auth().createUserWithEmailAndPassword(this.emailSignup, this.passwordSignup).catch(function(error) {
      // Handle Errors here.
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
  template: `
    <h2 ng-style="{textAlign:'center', marginTop:'20px'}">New User or Existing User</h2>
    <div class="bg-danger text-white" ng-bind="signup.error"></div>
    <span>
      <form action="./search.html" ng-style="{position:'absolute', top:'30%', left:'20%', 'background-color':'#fcf1d4', padding:'10px'}">
        <h3>MyBooks: Sign-Up</h3>
        <div class="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input ng-model="$ctrl.emailSignup" ype="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
          <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input ng-model="$ctrl.passwordSignup" type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
        </div>      
        <button ng-href="{{ ($ctrl.passwordSignup.length > 5) && $ctrl.emailSignup ? "./search.html" : "#" }}" type="submit" class="btn btn-primary" ng-click="$ctrl.signUp()">Sign-Up</button>        
      </form>      
    </span>
    <span>
      <div class="bg-danger text-white" ng-bind="login.error"></div>
      <form action="./search.html" ng-style="{position:'absolute', top:'30%', left:'60%', 'background-color':'#fcf1d4', padding:'10px'}">
        <h3>MyBooks: Login</h3>
        <div class="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input ng-model="$ctrl.emailLogin" ype="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
          <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input ng-model="$ctrl.passwordLogin" type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
        </div>      
        <button ng-href="{{ ($ctr.passwordLogin.length > 5) && $ctrl.emailLogin ? './search.html' : '#' }}" type="submit" class="btn btn-primary" ng-click="$ctrl.login()">Login</button>                
      </form>      
    </span>    
  `,
  controller: ['$scope', login]
}

var introTest = function() {
  return {
    getGreeting: function (name) {
      return "Hello " + name;
    }
  }
}

myLogin.controller('myLoginCtrl',loginController);
myLogin.component('userLogin', loginComponent);
myLogin.factory('greeter', introTest)




