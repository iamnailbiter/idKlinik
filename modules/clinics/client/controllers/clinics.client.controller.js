(function () {
    'use strict';

    angular
        .module('clinics')
        .controller('ClinicsController', ClinicsController);

    ClinicsController.$inject = ['$scope', '$state', 'clinicResolve', 'Authentication'];

    function ClinicsController($scope, $state, clinic, Authentication) {
        var vm = this;

        vm.clinic = clinic;
        vm.authentication = Authentication;
        vm.error = null;
        vm.form = {};
        vm.remove = remove;
        vm.save = save;

        // Clinic List
        $scope.polyclinics = [
            { key:'general', mean:'Umum' },
            { key:'neurological', mean:'Saraf' }
        ];

        // Remove existing Patient
        function remove() {
            if (confirm('Are you sure you want to delete?')) {
                vm.clinic.$remove($state.go('clinics.list'));
            }
        }

        // Save Clinic
        function save(isValid) {
            if (!isValid) {
                $scope.$broadcast('show-errors-check-validity', 'vm.form.clinicForm');
                return false;
            }

            // TODO: move create/update logic to service
            if (vm.clinic._id) {
                vm.clinic.$update(successCallback, errorCallback);
            } else {
                vm.clinic.$save(successCallback, errorCallback);
            }

            function successCallback(res) {
                $state.go('clinics.view', {
                    clinicId: res._id
                });
            }

            function errorCallback(res) {
                vm.error = res.data.message;
            }
        }
    }
})();
