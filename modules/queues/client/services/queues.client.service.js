(function () {
    'use strict';

    angular
        .module('queues.services')
        .factory('QueuesService', QueuesService);

    QueuesService.$inject = ['$resource'];

    function QueuesService($resource) {
        return $resource('api/queues/:queueId', {
            queueId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
})();
