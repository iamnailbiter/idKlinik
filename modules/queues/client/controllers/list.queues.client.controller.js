(function () {
    'use strict';

    angular
        .module('queues')
        .controller('QueuesListController', QueuesListController);

    QueuesListController.$inject = ['$state','QueuesService','$filter','Authentication','ClinicsService'];

    function QueuesListController($state,QueuesService,$filter,Authentication,ClinicsService) {
        var vm = this;
        vm.authentication = Authentication;
        vm.directionTarget = 'md';

        QueuesService.query(function (data) {
            vm.queues = data;
            vm.buildPager();
        });

        // Clinic List
        vm.polyclinics = [
            {
                key:'general',
                mean:'Umum',
                target:'gnr',
                style:'success'
            },{
                key:'neurological',
                mean:'Saraf',
                target:'nrl',
                style:'warning'
            }
        ];

        if(vm.authentication.user.clinic){
            vm.clinic = ClinicsService.get({
                clinicId: vm.authentication.user.clinic
            });
        }

        vm.buildPager = function () {
            vm.pagedItems = [];
            vm.itemsPerPage = 15;
            vm.currentPage = 1;
            vm.figureOutItemsToDisplay();
        };

        vm.figureOutItemsToDisplay = function () {
            vm.filteredItems = $filter('filter')(vm.queues, {
                $: vm.search,direction:{
                    handled:$state.current.name==='queues.room'?'':null
                }
            });

            vm.filterLength = vm.filteredItems.length;
            var begin = ((vm.currentPage - 1) * vm.itemsPerPage);
            var end = begin + vm.itemsPerPage;
            vm.pagedItems = vm.filteredItems.slice(begin, end);
        };

        vm.pageChanged = function () {
            vm.figureOutItemsToDisplay();
        };

        // Date Picker Control for Queues Date
        vm.queuesDateCreated = new Date();

        vm.dateOptions = {
            formatYear: 'yy',
            startingDay: 1
        };
        vm.maxDate = new Date();
        vm.formats = ['dd MMMM yyyy', 'yyyy/MM/dd', 'MM/dd/yyyy', 'yyyy-MM-dd', 'shortDate'];
        vm.format = vm.formats[0];
        vm.altInputFormats = ['yyyy-MM-dd'];
        vm.bdPC = {
            opened: false
        };
        vm.openbdPC = function() {
            vm.bdPC.opened = true;
        };
    }
})();
