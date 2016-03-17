(function () {
    'use strict';

    angular
        .module('patients.routes')
        .config(routeConfig);

    routeConfig.$inject = ['$stateProvider'];

    function routeConfig($stateProvider) {
        $stateProvider
            .state('patients', {
                abstract: true,
                url: '/patients',
                template: '<ui-view/>'
            })
            .state('patients.list', {
                url: '',
                templateUrl: 'modules/patients/client/views/list-patients.client.view.html',
                controller: 'PatientsListController',
                controllerAs: 'vm',
                data: {
                    roles: ['cs','medic','doctor','admin']
                }
            })
            .state('patients.register', {
                url: '/register',
                templateUrl: 'modules/patients/client/views/form-patient.client.view.html',
                controller: 'PatientsController',
                controllerAs: 'vm',
                resolve: {
                    patientResolve: newPatient
                },
                data: {
                    roles: ['cs', 'admin']
                }
            })
            .state('patients.edit', {
                url: '/:patientId/edit',
                templateUrl: 'modules/patients/client/views/form-patient.client.view.html',
                controller: 'PatientsController',
                controllerAs: 'vm',
                resolve: {
                    patientResolve: getPatient
                },
                data: {
                    roles: ['cs', 'admin']
                }
            })
            .state('patients.detail', {
                url: '/:patientId',
                templateUrl: 'modules/patients/client/views/detail-patient.client.view.html',
                controller: 'PatientsController',
                controllerAs: 'vm',
                resolve: {
                    patientResolve: getPatient
                },
                data: {
                    roles: ['cs','medic','doctor','admin']
                }
            });
    }

    getPatient.$inject = ['$stateParams', 'PatientsService'];

    function getPatient($stateParams, PatientsService) {
        return PatientsService.get({
            patientId: $stateParams.patientId
        }).$promise;
    }


    newPatient.$inject = ['PatientsService'];

    function newPatient(PatientsService) {
        return new PatientsService();
    }
})();
