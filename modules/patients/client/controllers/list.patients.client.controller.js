(function () {
    'use strict';

    angular
        .module('patients')
        .controller('PatientsListController', PatientsListController);

    PatientsListController.$inject = ['PatientsService','$filter'];

    function PatientsListController(PatientsService,$filter) {
        var vm = this;

        PatientsService.query(function (data) {
            vm.patients = data;
            vm.buildPager();
        });


        //vm.patients = PatientsService.query();

        vm.calculateAge = function calculateAge(birthdate) {
            var ageDifMs = Date.now() - Date.parse(birthdate);
            var ageDate = new Date(ageDifMs);
            return Math.abs(ageDate.getUTCFullYear() - 1970);
        };

        vm.buildPager = function () {
            vm.pagedItems = [];
            vm.itemsPerPage = 15;
            vm.currentPage = 1;
            vm.figureOutItemsToDisplay();
        };

        vm.figureOutItemsToDisplay = function () {
            vm.filteredItems = $filter('filter')(vm.patients, {
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
})();
