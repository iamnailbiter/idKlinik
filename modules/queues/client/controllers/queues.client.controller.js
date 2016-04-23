(function () {
    'use strict';

    angular
        .module('queues')
        .controller('QueuesController', QueuesController);

    QueuesController.$inject = ['$scope', '$state', 'queueResolve', 'Authentication', '$filter', 'MedicalRecordsService'];

    function QueuesController($scope, $state, queue, Authentication, $filter, MedicalRecordsService) {
        var vm = this;

        vm.queue = queue;
        vm.authentication = Authentication;
        vm.error = null;
        vm.form = {};
        vm.state = $state;
        vm.remove = remove;
        vm.handled = handled;
        vm.save = save;
        vm.createMedicalRecord = createMedicalRecord;

        angular.forEach(vm.queue.direction, function(value, key){
            if(value._id === $state.params.queueDirectionId){
                vm.queue.directionTarget = value.target;
                vm.queue.directionNumber = value.number;
                vm.queue.directionPriority = value.priority;
                vm.queue.directionCreated = value.created;
                if(value.next){
                    vm.queue.directionNext = value.next;
                }
                if(value.handled){
                    vm.queue.directionHandled = value.handled;
                }
            }
        });

        switch(vm.queue.directionTarget) {
            case 'md':
                vm.queueDirectionTargetMean = 'Pelayanan Medis';
                break;
            case 'gnr':
                vm.queueDirectionTargetMean = 'Klinik Umum';
                break;
            case 'nrl':
                vm.queueDirectionTargetMean = 'Klinik Saraf';
                break;
            default:
                vm.queueDirectionTargetMean = 'Pelayanan Informasi';
        }
        // Handled current Queue
        function handled() {
            if (confirm('Are you sure you want to handle this patient?')) {
                vm.queue.directionHandledId = $state.params.queueDirectionId;
                vm.queue.$update(successHandleCallback, errorCallback);
            }
            function successHandleCallback(res) {
                createMedicalRecord();
            }
            function errorCallback(res) {
                vm.error = res.data.message;
            }
        }


        // Create new Medical Record
        function createMedicalRecord() {
            var medicalrecord = new MedicalRecordsService();
            medicalrecord.patient = vm.queue.patient._id;
            medicalrecord.queue = vm.queue._id;
            medicalrecord.$save(mrSuccessCallback, mrErrorCallback);
            function mrSuccessCallback(res) {
                $state.go('medicalrecords.view', {
                    medicalrecordId: res._id
                });
            }
            function mrErrorCallback(res) {
                vm.error = res.data.message;
            }
        }

        // Remove existing Queue
        function remove() {
            if (confirm('Are you sure you want to delete?')) {
                vm.queue.$remove($state.go('queues.list'));
            }
        }

        // Save Queue
        function save(isValid) {
            if (!isValid) {
                $scope.$broadcast('show-errors-check-validity', 'vm.form.queueForm');
                return false;
            }

            // TODO: move create/update logic to service
            if (vm.queue._id) {
                vm.queue.$update(successCallback, errorCallback);
            } else {
                vm.queue.$save(successCallback, errorCallback);
            }


            function successCallback(res) {
                $state.go('queues.print', {
                    queueId: res._id
                });
            }

            function errorCallback(res) {
                vm.error = res.data.message;
            }
        }
    }
})();
