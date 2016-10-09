titlesApp
  .controller('translationsController', ['$scope', '$http', '$stateParams', 'Translation', 'Comment', 'Auth', '$filter', function($scope, $http, $stateParams, Translation, Comment, Auth, $filter){

  var init = function() {
    getPosts();
    $scope.title = {};
    $scope.current_translation = {};
    $scope.translations = {};
    $scope.translations.unofficial = [];
    $scope.translations.official = [];
  };

  function formatTimestamps(translations) {
    translations.forEach(function(translation){
      translation.comments.forEach(function(comment){
        var date = moment(comment.created_at.slice(0,10)+" "+ comment.created_at.slice(11,19))
                        .subtract(6, 'hours')
                        .format('MM-DD-YY h:mm a');
        comment.formatted_date = date;
      });
    });
    return translations;
  }

  function sortByAuthorized(translations) {
    $scope.translations.unofficial = [];
    $scope.translations.official = [];
    translations.forEach( function(translation) {
      if (translation.approved) {
        $scope.translations.official.push(translation);
      } else {
        $scope.translations.unofficial.push(translation);
      }
    });
  }

  $scope.ifComments = function(comments) {
    console.log(comments.length > 0);
    return comments.length > 0;
  };

  getPosts = function() {
    $http.get('api/titles/'+ $stateParams.id).then(function(response) {
      $scope.title = response.data;
      var translations = formatTimestamps(response.data.translations);
      sortByAuthorized(translations);
    });
  };

  $scope.deleteTranslation = function(id) {
    Translation.delete(id).then(function() {
      getPosts();
    });
  };

  $scope.noOfficialTranslations = function() {
    return $scope.translations.official.length === 0;
  };

  $scope.noUnofficialTranslations = function() {
    return $scope.translations.unofficial.length === 0;
  };

  $scope.logCurrentTranslation = function(translation) {
    console.log("in herer");
    $scope.current_translation = translation;
  };



  init();


}]);
