(function () {
    'use strict';

    angular
        .module('clinics.services')
        .factory('ClinicsService', ClinicsService);

    ClinicsService.$inject = ['$resource'];

    function ClinicsService($resource) {
        return $resource('api/clinics/:clinicId', {
            clinicId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
})();
