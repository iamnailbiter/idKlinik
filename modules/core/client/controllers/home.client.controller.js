'use strict';

angular.module('core').controller('HomeController', ['$scope', 'Authentication', 'ClinicsService',
  function ($scope, Authentication, ClinicsService) {
    // This provides Authentication context.
    $scope.authentication = Authentication;

    if($scope.authentication.user && $scope.authentication.user.clinic){
      $scope.clinic = ClinicsService.get({
        clinicId: $scope.authentication.user.clinic
      });
    }
  }
]);
