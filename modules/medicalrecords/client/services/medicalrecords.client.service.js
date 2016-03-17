(function () {
    'use strict';

    angular
        .module('medicalrecords.services')
        .factory('MedicalRecordsService', MedicalRecordsService);

    MedicalRecordsService.$inject = ['$resource'];

    function MedicalRecordsService($resource) {
        return $resource('api/medicalrecords/:medicalrecordId', {
            medicalrecordId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }

})();
