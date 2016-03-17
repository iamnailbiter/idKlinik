'use strict';

angular.module('users.admin').run(['Menus',
    function (Menus) {
        Menus.addSubMenuItem('topbar', 'admin', {
            title: 'Manage Clinics',
            state: 'clinics.list'
        });
    }
]);
