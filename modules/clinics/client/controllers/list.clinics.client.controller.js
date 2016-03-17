(function () {
    'use strict';

    angular
        .module('clinics')
        .controller('ClinicsListController', ClinicsListController);

    ClinicsListController.$inject = ['ClinicsService','$filter'];

    function ClinicsListController(ClinicsService,$filter) {
        var vm = this;

        ClinicsService.query(function (data) {
            vm.clinics = data;
            vm.buildPager();
        });


        //vm.clinics = ClinicsService.query();

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
            vm.filteredItems = $filter('filter')(vm.clinics, {
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
