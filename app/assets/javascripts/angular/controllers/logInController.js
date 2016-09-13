titlesApp
  .controller('logInController', ['$scope', 'Auth', function($scope, Auth){

  $scope.errors = "";

  $scope.logInUser = function(data) {
    console.log(data);

    var credentials = {
      email: 'clwoods@uci.edu',
      password: 'orange7A'
    };

    var config = {
        headers: {
            'X-HTTP-Method-Override': 'POST'
        }
    };

    Auth.login(credentials, config).then(function(user) {
      console.log(user); // => {id: 1, ect: '...'}
    }, function(error) {
      $scope.errors = error.data.error;
        // Authentication failed...
    });

    $scope.$on('devise:login', function(event, currentUser) {
      console.log(currentUser, "LOGGED IN");
    });

    $scope.$on('devise:new-session', function(event, currentUser) {
      console.log(currentUser, "NEW SESSION");
      $scope.errors = "";
      $scope.dismiss();
    });
  };

}]);
