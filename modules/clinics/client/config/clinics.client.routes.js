(function () {
    'use strict';

    angular
        .module('clinics.routes')
        .config(routeConfig);

    routeConfig.$inject = ['$stateProvider'];

    function routeConfig($stateProvider) {
        $stateProvider
            .state('clinics', {
                abstract: true,
                url: '/clinics',
                template: '<ui-view/>'
            })
            .state('clinics.list', {
                url: '',
                templateUrl: 'modules/clinics/client/views/list-clinics.client.view.html',
                controller: 'ClinicsListController',
                controllerAs: 'vm',
                data: {
                    roles: ['admin']
                }
            })
            .state('clinics.create', {
                url: '/create',
                templateUrl: 'modules/clinics/client/views/form-clinic.client.view.html',
                controller: 'ClinicsController',
                controllerAs: 'vm',
                resolve: {
                    clinicResolve: newClinic
                },
                data: {
                    roles: ['admin']
                }
            })
            .state('clinics.edit', {
                url: '/:clinicId/edit',
                templateUrl: 'modules/clinics/client/views/form-clinic.client.view.html',
                controller: 'ClinicsController',
                controllerAs: 'vm',
                resolve: {
                    clinicResolve: getClinic
                },
                data: {
                    roles: ['admin']
                }
            })
            .state('clinics.view', {
                url: '/:clinicId',
                templateUrl: 'modules/clinics/client/views/view-clinic.client.view.html',
                controller: 'ClinicsController',
                controllerAs: 'vm',
                resolve: {
                    clinicResolve: getClinic
                },
                data: {
                    roles: ['user']
                }
            });
    }

    getClinic.$inject = ['$stateParams', 'ClinicsService'];

    function getClinic($stateParams, ClinicsService) {
        return ClinicsService.get({
            clinicId: $stateParams.clinicId
        }).$promise;
    }


    newClinic.$inject = ['ClinicsService'];

    function newClinic(ClinicsService) {
        return new ClinicsService();
    }
})();
