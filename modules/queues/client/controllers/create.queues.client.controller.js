(function () {
    'use strict';

    angular
        .module('queues')
        .controller('CreateQueuesController', CreateQueuesController);

    CreateQueuesController.$inject = ['$scope', '$state', 'queueResolve', 'patientResolve', 'Authentication','QueuesService','$filter', 'ClinicsService'];

    function CreateQueuesController($scope, $state, queue, patient, Authentication, QueuesService, $filter, ClinicsService) {
        var vm = this;

        vm.patient = patient;
        vm.queue = queue;
        vm.queue.patient = vm.patient._id;
        vm.authentication = Authentication;
        vm.error = null;
        vm.form = {};
        vm.remove = remove;
        vm.save = save;


        // Clinic List
        vm.polyclinics = [
            { key:'general', mean:'Umum', target:'gnr', style:'success' },
            { key:'neurological', mean:'Saraf', target:'nrl', style:'warning' }
        ];

        if(vm.authentication.user.clinic){
            vm.clinic = ClinicsService.get({
                clinicId: vm.authentication.user.clinic
            });
        }

        QueuesService.query(function (data) {
            vm.queues = data;
            vm.queuesToday();
        });

        vm.queuesToday = function () {
            var today = new Date();
            vm.queuesTodayTotal = $filter('filter')(vm.queues, {
                created : today.toISOString().substring(0, 10)
            });

            // Medic Queues
                vm.queuesTodayMD = $filter('filter')(vm.queuesTodayTotal,{
                    direction: {
                        target :'md'
                    }
                });

                if(vm.queuesTodayMD.length>0){

                    vm.queuesTodayHandledMD = $filter('filter')(vm.queuesTodayMD,{
                        direction: {
                            handled : today.toISOString().substring(0, 10),
                        }
                    });

                    if(vm.queuesTodayHandledMD.length>0) {
                        vm.queuesTodayOrderByHandledMD = $filter('orderBy')(vm.queuesTodayHandledMD, '-handled');
                        vm.queuesTodayLastestHandledMD = vm.queuesTodayOrderByHandledMD[0];
                        vm.queuesTodayLastestHandledMDDirection = $filter('filter')(vm.queuesTodayLastestHandledMD.direction, {
                            target: 'md'
                        });
                    }

                    vm.queuesTodayWaitingMD = $filter('filter')(vm.queuesTodayMD,{
                        direction: {
                            handled : null
                        }
                    });
                }
            vm.queuesNewEntryMD = vm.queuesTodayMD.length +1;
            // End Medic Queues
        };

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
                if(vm.patient._id){
                    vm.queue.direction = {
                        target: 'md',
                        next: vm.directionNext,
                        number: vm.queuesNewEntryMD
                    };
                } else {
                    vm.queue.direction = {
                        target: 'cs',
                        number: vm.queuesNewEntryMD,
                        created: Date.now()
                    };
                }
                vm.queue.$save(successCallback, errorCallback);
            }

            function successCallback(res) {
                $state.go('queues.print', {
                    queueId: res._id,
                    queueDirectionId: res.direction[res.direction.length-1]._id
                });
            }

            function errorCallback(res) {
                vm.error = res.data.message;
            }
        }
    }
})();
