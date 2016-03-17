(function () {
    'use strict';

    angular
        .module('medicalrecords')
        .controller('MedicalRecordsCreateController', MedicalRecordsCreateController);

    MedicalRecordsCreateController.$inject = ['$scope', '$state', '$filter', 'medicalrecordResolve', 'patientResolve', 'Authentication'];

    function MedicalRecordsCreateController($scope, $state, $filter, medicalrecord, patient, Authentication) {
        var vm = this;

        vm.medicalrecord = medicalrecord;
        vm.medicalrecord.patient = patient;
        vm.authentication = Authentication;
        vm.error = null;
        vm.form = {};
        vm.remove = remove;
        vm.save = save;

        // Remove existing Medical Record
        function remove() {
            if (confirm('Are you sure you want to delete?')) {
                vm.medicalrecord.$remove($state.go('medicalrecords.list'));
            }
        }

        // Save Medical Record
        function save(isValid) {
            if (!isValid) {
                $scope.$broadcast('show-errors-check-validity', 'vm.form.medicalrecordForm');
                return false;
            }

            // TODO: move create/update logic to service
            if (vm.medicalrecord._id) {
                vm.medicalrecord.$update(successCallback, errorCallback);
            } else {
                //vm.medicalrecord.patient = queue.patient;
                vm.medicalrecord.$save(successCallback, errorCallback);
            }

            function successCallback(res) {
                $state.go('medicalrecords.view', {
                    medicalrecordId: res._id
                });
            }

            function errorCallback(res) {
                vm.error = res.data.message;
            }
        }
    }
})();
