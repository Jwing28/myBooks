var myApp = angular.module('myApp',[]);

myApp.controller('myController', ['$scope', function($scope) {
  $scope.test = 'hello';

}]);

myApp.component('searchHeader', {
  template:
  `
    <div class="menu">
      <div class="btn-group" role="group">
        <button id="btnGroupDrop1" type="button" class="btn btn-secondary dropdown-toggle btn btn-info" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Dropdown
        </button>
        <div class="dropdown-menu" aria-labelledby="btnGroupDrop1">
          <a class="dropdown-item" href="#">Favorites List</a>
          <a class="dropdown-item" href="#">Login/Logout</a>
        </div>
      </div>   
        
      <div class="searchBar container-fluid">        
        <h2>MyBooks</h2>
        <input />
        <button class="btn btn-primary" type="submit">Find Books</button>
      </div>
      <div class="searchResults"></div>
    </div>
    {{ $ctrl.person }}
  `,
  bindings: { name: '@'},
  controller:function() {
    this.person = "jon";
  }
});