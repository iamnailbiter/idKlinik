(function () {
    'use strict';

    angular
        .module('patients')
        .run(menuConfig);

    menuConfig.$inject = ['Menus'];

    function menuConfig(Menus) {
        Menus.addMenuItem('topbar', {
            title: 'Pasien',
            state: 'patients',
            type: 'dropdown',
            roles: ['cs','medic','doctor','neurologist']
        });

        // Add the dropdown list item
        Menus.addSubMenuItem('topbar', 'patients', {
            title: 'Daftar Pasien',
            state: 'patients.list',
            roles: ['cs','medic','doctor','neurologist']
        });

        // Add the dropdown create item
        Menus.addSubMenuItem('topbar', 'patients', {
            title: 'Pasien Baru',
            state: 'patients.register',
            roles: ['cs']
        });
    }
})();
