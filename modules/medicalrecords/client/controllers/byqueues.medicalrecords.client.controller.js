(function () {
    'use strict';

    angular
        .module('medicalrecords')
        .controller('MedicalRecordsByQueuesController', MedicalRecordsByQueuesController);

    MedicalRecordsByQueuesController.$inject = ['$scope', '$state', 'medicalrecordResolve', 'queueResolve', 'Authentication', 'PatientsService'];

    function MedicalRecordsByQueuesController($scope, $state, medicalrecord, queue, Authentication, PatientsService) {
        var vm = this;

        vm.medicalrecord = medicalrecord;
        vm.queue = queue;
        vm.authentication = Authentication;
        vm.error = null;
        vm.form = {};
        vm.medicalrecord.queue = vm.queue._id;
        vm.medicalrecord.patient = vm.queue.patient._id;
        vm.remove = remove;
        vm.save = save;

        vm.patient = PatientsService.get({
            patientId: vm.queue.patient._id
        });


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
                vm.medicalrecord.$save(successCallback, errorCallback);
            }

            function successCallback(res) {
                vm.queue.medicalrecord = res._id;
                vm.queue.$update();
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
