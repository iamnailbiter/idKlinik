(function () {
    'use strict';

    angular
        .module('queues')
        .run(menuConfig);

    menuConfig.$inject = ['Menus'];

    function menuConfig(Menus) {
        Menus.addMenuItem('topbar', {
            title: 'Antrian',
            state: 'queues.list',
            roles: ['cs','medic','doctor','neurologist']
        });
        Menus.addMenuItem('topbar', {
            title: 'Pasien Ruangan',
            state: 'queues.room',
            roles: ['cs','medic','doctor','neurologist']
        });
    }
})();
