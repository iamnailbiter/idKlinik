(function () {
    'use strict';

    angular
        .module('patients.services')
        .factory('PatientsService', PatientsService);

    PatientsService.$inject = ['$resource'];

    function PatientsService($resource) {
        return $resource('api/patients/:patientId', {
            patientId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
})();
