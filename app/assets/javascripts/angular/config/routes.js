titlesApp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/');

  var mainState = {
    name: 'main',
    url: '/',
    template: '<titles-main></titles-main>'
  };

  var aboutState = {
    name: 'about',
    url: '/about',
    template: '<about-info></about-info>'
  };

  var admin = {
    name: 'admin',
    url: '/admin',
    template: '<admin></admin>',
    resolve: {
      auth: function(Auth, $q) {
        var deferred = $q.defer();
        return Auth.currentUser().then(function(user) {
          // if (!user.fname) {
          //   console.log(user);
          //   return $q.reject("Not Authorized");
          // }
          return deferred.resolve({});
        });
      }
    }
  };

  var contributors = {
    name: 'contributors',
    url: '/contributors',
    template: '<contributors></contributors>'
  };

  $stateProvider.state(aboutState)
                .state(mainState)
                .state(admin)
                .state(contributors)
                .state('titles' ,{
                  url: '/titles/:id',
                  template: '<translations></translations>',
                  controller: 'translationsController',
                  resolve: {
                    auth: function(Auth, $q) {
                      var deferred = $q.defer();
                      return Auth.currentUser().then(function(user) {
                        // if (!user.fname) {
                        //   console.log(user);
                        //   return $q.reject("Not Authorized");
                        // }
                        return deferred.resolve({});
                      });
                    }
                  }
                }).state('profile' ,{
                  url: '/profile/:id',
                  template: '<profile></profile>',
                  controller: 'profileController',
                  resolve: {
                    auth: function(Auth, $q) {
                      var deferred = $q.defer();
                      return Auth.currentUser().then(function(user) {
                        // if (!user.fname) {
                        //   console.log(user);
                        //   return $q.reject("Not Authorized");
                        // }
                        return deferred.resolve({});
                      });
                    }
                  }
                });



}]);

titlesApp.run(['$state', function ($state) {}]);
