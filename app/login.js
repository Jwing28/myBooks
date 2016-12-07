var myLogin = angular.module('myLogin',[]);

function loginController ($scope) {
  $scope.test = 'hi';
}

function login () {

}

var loginComponent = {
  template: `
      <form ng-style="{position:'absolute', top:'30%', left:'37%', 'background-color':'#fcf1d4', padding:'10px'}">
        <h3>MyBooks: Login</h3>
        <div class="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
          <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
        </div>      
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
  `,
  controller: login
}

myLogin.controller('myLoginCtrl', ['$scope', loginController]);
myLogin.component('userLogin', loginComponent);