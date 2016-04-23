(function () {
    'use strict';

    angular
        .module('patients')
        .controller('PatientsController', PatientsController);

    PatientsController.$inject = ['$scope', '$state', '$filter', 'patientResolve', 'Authentication', 'PatientMedicalRecordsService', 'MedicalRecordsService'];

    function PatientsController($scope, $state, $filter, patient, Authentication,PatientMedicalRecordsService, MedicalRecordsService) {
        var vm = this;

        vm.patient = patient;
        vm.authentication = Authentication;
        vm.error = null;
        vm.form = {};
        vm.remove = remove;
        vm.save = save;
        vm.createMedicalRecord = createMedicalRecord;

        // List Patient's Medical Records
        if(vm.patient._id){
            //vm.medicalrecords = PatientMedicalRecordsService.query({
            //    patientId: vm.patient._id
            //});

            PatientMedicalRecordsService.query({
                patientId: vm.patient._id
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
        }

        // Create new Medical Record
        function createMedicalRecord() {
            var medicalrecord = new MedicalRecordsService();
            medicalrecord.patient = vm.patient._id;
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

        // Remove existing Patient
        function remove() {
            if (confirm('Are you sure you want to delete?')) {
                vm.patient.$remove($state.go('patients.list'));
            }
        }

        // Save Patient
        function save(isValid) {
            if (!isValid) {
                $scope.$broadcast('show-errors-check-validity', 'vm.form.patientForm');
                return false;
            }

            // TODO: move create/update logic to service
            if (vm.patient._id) {
                vm.patient.$update(successCallback, errorCallback);
            } else {
                vm.patient.$save(successCallback, errorCallback);
            }

            function successCallback(res) {
                $state.go('patients.detail', {
                    patientId: res._id
                });
            }

            function errorCallback(res) {
                vm.error = res.data.message;
            }
        }

        // Date Picker Control for birthdate
        vm.today = function() {
            vm.patient.birthdate = new Date();
        };

        vm.dateOptions = {
            formatYear: 'yy',
            startingDay: 1
        };
        vm.maxDate = new Date();
        vm.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'MM/dd/yyyy', 'shortDate'];
        vm.format = vm.formats[2];
        vm.altInputFormats = ['MM/dd/yyyy'];
        vm.bdPC = {
            opened: false
        };
        vm.openbdPC = function() {
            vm.bdPC.opened = true;
        };
    }
})();
