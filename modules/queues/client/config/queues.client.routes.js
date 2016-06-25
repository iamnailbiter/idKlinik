(function () {
    'use strict';

    angular
        .module('queues.routes')
        .config(routeConfig);

    routeConfig.$inject = ['$stateProvider'];

    function routeConfig($stateProvider) {
        $stateProvider
            .state('queues', {
                abstract: true,
                url: '/queues',
                template: '<ui-view/>'
            })
            .state('queues.list', {
                url: '',
                templateUrl: 'modules/queues/client/views/list-queues.client.view.html',
                controller: 'QueuesListController',
                controllerAs: 'vm',
                data: {
                    roles: ['cs', 'medic', 'doctor', 'admin']
                }
            })
            .state('queues.room', {
                url: '/room',
                templateUrl: 'modules/queues/client/views/room-queues.client.view.html',
                controller: 'QueuesListController',
                controllerAs: 'vm',
                data: {
                    roles: ['cs', 'medic', 'doctor', 'admin']
                }
            })
            .state('queues.create', {
                url: '/:patientId/create',
                templateUrl: 'modules/queues/client/views/form-queue.client.view.html',
                controller: 'CreateQueuesController',
                controllerAs: 'vm',
                resolve: {
                    queueResolve: newQueue,
                    patientResolve : getPatient
                },
                data: {
                    roles: ['cs', 'admin']
                }
            })
            .state('queues.print', {
                url: '/:queueId/:queueDirectionId/print',
                templateUrl: 'modules/queues/client/views/view-queue.client.view.html',
                controller: 'QueuesController',
                controllerAs: 'vm',
                resolve: {
                    queueResolve: getQueue
                }
            })
            .state('queues.callmd', {
                url: '/:queueId/:queueDirectionId/callmd',
                templateUrl: 'modules/queues/client/views/view-queue.client.view.html',
                controller: 'QueuesController',
                controllerAs: 'vm',
                resolve: {
                    queueResolve: getQueue
                },
                data: {
                    roles: ['medic', 'admin']
                }
            })
            .state('queues.callgnr', {
                url: '/:queueId/:queueDirectionId/callgnr',
                templateUrl: 'modules/queues/client/views/view-queue.client.view.html',
                controller: 'QueuesController',
                controllerAs: 'vm',
                resolve: {
                    queueResolve: getQueue
                },
                data: {
                    roles: ['doctor', 'medic', 'neurologist', 'admin']
                }
            })
            .state('queues.callnrl', {
                url: '/:queueId/:queueDirectionId/callnrl',
                templateUrl: 'modules/queues/client/views/view-queue.client.view.html',
                controller: 'QueuesController',
                controllerAs: 'vm',
                resolve: {
                    queueResolve: getQueue
                },
                data: {
                    roles: ['doctor', 'medic', 'neurologist', 'admin']
                }
            });
    }

    getQueue.$inject = ['$stateParams', 'QueuesService'];

    function getQueue($stateParams, QueuesService) {
        return QueuesService.get({
            queueId: $stateParams.queueId
        }).$promise;
    }

    getPatient.$inject = ['$stateParams', 'PatientsService'];

    function getPatient($stateParams, PatientsService) {
        return PatientsService.get({
            patientId: $stateParams.patientId
        }).$promise;
    }

    newQueue.$inject = ['QueuesService'];

    function newQueue(QueuesService) {
        return new QueuesService();
    }
})();
