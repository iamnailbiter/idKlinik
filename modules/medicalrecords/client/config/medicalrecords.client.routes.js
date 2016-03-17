(function () {
    'use strict';

    angular
        .module('medicalrecords.routes')
        .config(routeConfig);

    routeConfig.$inject = ['$stateProvider'];

    function routeConfig($stateProvider) {
        $stateProvider
            .state('medicalrecords', {
                abstract: true,
                url: '/medicalrecords',
                template: '<ui-view/>'
            })
            .state('medicalrecords.list', {
                url: '',
                templateUrl: 'modules/medicalrecords/client/views/list-medicalrecords.client.view.html',
                controller: 'MedicalRecordsListController',
                controllerAs: 'vm'
            })
            .state('medicalrecords.create', {
                url: '/:patientId/create',
                templateUrl: 'modules/medicalrecords/client/views/form-anamnesis.client.view.html',
                controller: 'MedicalRecordsCreateController',
                controllerAs: 'vm',
                resolve: {
                    patientResolve: getPatient,
                    medicalrecordResolve: newMedicalRecord
                },
                data: {
                    roles: ['medic','doctor','neurologist','admin']
                }
            })
            .state('medicalrecords.anamnesis', {
                url: '/:medicalrecordId/anamnesis',
                templateUrl: 'modules/medicalrecords/client/views/form-anamnesis.client.view.html',
                controller: 'MedicalRecordsController',
                controllerAs: 'vm',
                resolve: {
                    medicalrecordResolve: getMedicalRecord
                },
                data: {
                    roles: ['medic','admin']
                }
            })
            .state('medicalrecords.internus', {
                url: '/:medicalrecordId/internus',
                templateUrl: 'modules/medicalrecords/client/views/form-internus.client.view.html',
                controller: 'MedicalRecordsController',
                controllerAs: 'vm',
                resolve: {
                    medicalrecordResolve: getMedicalRecord
                },
                data: {
                    roles: ['doctor','neurologist','admin']
                }
            })
            .state('medicalrecords.diagnosis', {
                url: '/:medicalrecordId/diagnosis',
                templateUrl: 'modules/medicalrecords/client/views/form-diagnosis.client.view.html',
                controller: 'MedicalRecordsController',
                controllerAs: 'vm',
                resolve: {
                    medicalrecordResolve: getMedicalRecord
                },
                data: {
                    roles: ['doctor','neurologist','admin']
                }
            })
            .state('medicalrecords.soap', {
                url: '/:medicalrecordId/soap',
                templateUrl: 'modules/medicalrecords/client/views/form-soap.client.view.html',
                controller: 'MedicalRecordsController',
                controllerAs: 'vm',
                resolve: {
                    medicalrecordResolve: getMedicalRecord
                },
                data: {
                    roles: ['doctor','neurologist','admin']
                }
            })
            .state('medicalrecords.neurologic', {
                url: '/:medicalrecordId/neurologic',
                templateUrl: 'modules/medicalrecords/client/views/form-neurologic.client.view.html',
                controller: 'MedicalRecordsController',
                controllerAs: 'vm',
                resolve: {
                    medicalrecordResolve: getMedicalRecord
                },
                data: {
                    roles: ['doctor','neurologist','admin']
                }
            })
            .state('medicalrecords.edit', {
                url: '/:medicalrecordId/edit',
                templateUrl: 'modules/medicalrecords/client/views/form-medicalrecord.client.view.html',
                controller: 'MedicalRecordsController',
                controllerAs: 'vm',
                resolve: {
                    medicalrecordResolve: getMedicalRecord
                },
                data: {
                    roles: ['medic', 'admin']
                }
            })
            .state('medicalrecords.view', {
                url: '/:medicalrecordId',
                templateUrl: 'modules/medicalrecords/client/views/view-medicalrecord.client.view.html',
                controller: 'MedicalRecordsController',
                controllerAs: 'vm',
                resolve: {
                    medicalrecordResolve: getMedicalRecord
                },
                data: {
                    roles: ['medic','doctor','admin']
                }
            });
    }

    getMedicalRecord.$inject = ['$stateParams', 'MedicalRecordsService'];

    function getMedicalRecord($stateParams, MedicalRecordsService) {
        return MedicalRecordsService.get({
            medicalrecordId: $stateParams.medicalrecordId
        }).$promise;
    }

    newMedicalRecord.$inject = ['MedicalRecordsService'];

    function newMedicalRecord(MedicalRecordsService) {
        return new MedicalRecordsService();
    }

    getPatient.$inject = ['$stateParams', 'PatientsService'];

    function getPatient($stateParams, PatientsService) {
        return PatientsService.get({
            patientId: $stateParams.patientId
        }).$promise;
    }
})();
