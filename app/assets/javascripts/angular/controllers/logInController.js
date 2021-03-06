titlesApp
  .controller('logInController', ['$scope', 'Auth', '$http', 'userService', function($scope, Auth, $http, userService){

  $scope.errors = "";

  $scope.passwordReset = false;
  $scope.resetSent = false;
  $scope.logIn = true;

  $scope.passwordResetView = function() {
    $scope.passwordReset = true;
    $scope.logIn = false;
  };

  $scope.logInResetView = function() {
    $scope.passwordReset = false;
    $scope.logIn = true;
    $scope.resetSent = false;
  };

  $scope.logInUser = function(data) {
    var credentials = {
      email: data.email,
      password: data.password
    };

    var config = {
        headers: {
            'X-HTTP-Method-Override': 'POST'
        }
    };

    Auth.login(credentials, config).then(function(user) {
      userService.setUser(user);
    }, function(error) {
      $scope.errors = error.data.error;
        // Authentication failed...
    });

    $scope.$on('devise:login', function(event, currentUser) {
      // console.log(currentUser, "LOGGED IN");
    });

    $scope.$on('devise:new-session', function(event, currentUser) {
      // console.log(currentUser, "NEW SESSION");
      $scope.errors = "";
      $scope.dismiss();
    });
  };

  $scope.resetPass = function(data, form) {
    var parameters = {
      email: data.email
    };

    Auth.sendResetPasswordInstructions(parameters).then(function(response) {
        // Send email if user found otherwise log errors...
        $scope.resetSent = true;
    }, function(error) {
        console.log("FAILED", error);
        if (error.data.errors.email) {
          $scope.emailExists = true;
        }
    });

    $scope.$on('devise:send-reset-password-instructions-successfully', function(event) {
        // ...
    });
  };

}]);
