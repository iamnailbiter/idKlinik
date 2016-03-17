(function () {
    'use strict';

    angular
        .module('medicalrecords.services')
        .factory('PatientMedicalRecordsService', PatientMedicalRecordsService);

    PatientMedicalRecordsService.$inject = ['$resource'];

    function PatientMedicalRecordsService($resource) {
        return $resource('api/medicalrecords/patient/:patientId', {
            patientId: '@_id'
        });
    }

})();
