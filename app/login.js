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

  this.login = function () {
    //could have check on inputs here..
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
      <form ng-style="{position:'absolute', top:'30%', left:'20%', 'background-color':'#fcf1d4', padding:'10px'}">
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
        <button type="submit" class="btn btn-primary" ng-click="$ctrl.signUp()">Sign-Up</button>        
      </form>      
    </span>
    <span>
      <div class="bg-danger text-white" ng-bind="login.error"></div>
      <form ng-style="{position:'absolute', top:'30%', left:'60%', 'background-color':'#fcf1d4', padding:'10px'}">
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
        <button type="submit" class="btn btn-primary" ng-click="$ctrl.login()">Login</button>                
      </form>      
    </span>    
  `,
  controller: ['$scope', login]
}

myLogin.controller('myLoginCtrl',loginController);
myLogin.component('userLogin', loginComponent);




