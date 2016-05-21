(function () {
    'use strict';

    angular
        .module('medicalrecords')
        .controller('MedicalRecordsController', MedicalRecordsController);

    MedicalRecordsController.$inject = ['$scope', '$state', '$filter', 'medicalrecordResolve', 'Authentication', 'PatientMedicalRecordsService'];

    function MedicalRecordsController($scope, $state, $filter, medicalrecord, Authentication, PatientMedicalRecordsService) {
        var vm = this;

        vm.medicalrecord = medicalrecord;
        vm.authentication = Authentication;
        vm.error = null;
        vm.form = {};
        vm.remove = remove;
        vm.save = save;

        // *********************************************************************
        PatientMedicalRecordsService.query({
            patientId: vm.medicalrecord.patient._id
        },function (data) {
            vm.medicalrecords = data;
            vm.buildPager();
        });


        vm.buildPager = function () {
            vm.pagedItems = [];
            vm.itemsPerPage = 15;
            vm.currentPage = 1;
            vm.figureOutItemsToDisplay();
        };

        vm.figureOutItemsToDisplay = function () {
            vm.filteredItems = $filter('filter')(vm.medicalrecords, {
                $: vm.search
            });
            vm.filterLength = vm.filteredItems.length;
            var begin = ((vm.currentPage - 1) * vm.itemsPerPage);
            var end = begin + vm.itemsPerPage;
            vm.pagedItems = vm.filteredItems.slice(begin, end);
        };

        vm.pageChanged = function () {
            vm.figureOutItemsToDisplay();
        };
        // *********************************************************************

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
                vm.error = res.data.message?res.data.message:'';
            }
        }
    }
})();
