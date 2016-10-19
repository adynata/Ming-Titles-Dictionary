titlesApp
  .controller('editTranslationController', ['$scope', 'Translation', 'Auth', function($scope, Translation, Auth){

  $scope.errors = "";

  $scope.resetTranslationForm = function() {
    $scope.formData = null;
    $scope.myForm.$setPristine();
  };

  $scope.postTranslation = function(data, form) {
    var translation = new Translation();
    Auth.currentUser().then(function(user) {
      console.log("$scope.title.id IN NEW TRANLATION", $scope.title.id);
      translation.translation_text = data.translation_text;
      translation.explanation = data.justification;
      translation.title_id = $scope.title.id;
      translation.user_id = user.id;
      translation.scholars = data.scholars;
      translation.additional_comment = data.additional_comment;
      translation.save().then(function() {
        $scope.getPosts();
        $scope.resetTranslationForm();
        $scope.dismiss();
      });
    }, function(error) {
      console.log("no session, translation cannot be saved");
    });
  };

}]);