(function () {
    'use strict';

    angular
        .module('medicalrecords')
        .run(menuConfig);

    menuConfig.$inject = ['Menus'];

    function menuConfig(Menus) {

    }
})();
