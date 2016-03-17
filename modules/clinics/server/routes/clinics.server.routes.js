'use strict';

/**
 * Module dependencies
 */
var clinicsPolicy = require('../policies/clinics.server.policy'),
    clinics = require('../controllers/clinics.server.controller');

module.exports = function (app) {
    // Clinics collection routes
    app.route('/api/clinics').all(clinicsPolicy.isAllowed)
        .get(clinics.list)
        .post(clinics.create);

    // Single clinic routes
    app.route('/api/clinics/:clinicId').all(clinicsPolicy.isAllowed)
        .get(clinics.read)
        .put(clinics.update)
        .delete(clinics.delete);

    // Finish by binding the clinic middleware
    app.param('clinicId', clinics.clinicByID);
};
