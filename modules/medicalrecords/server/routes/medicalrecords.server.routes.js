'use strict';

/**
 * Module dependencies
 */
var medicalrecordsPolicy = require('../policies/medicalrecords.server.policy'),
    medicalrecords = require('../controllers/medicalrecords.server.controller');

module.exports = function (app) {
    // Medical Records collection routes
    app.route('/api/medicalrecords').all(medicalrecordsPolicy.isAllowed)
        .get(medicalrecords.list)
        .post(medicalrecords.create);

    // Single medical record routes
    app.route('/api/medicalrecords/:medicalrecordId').all(medicalrecordsPolicy.isAllowed)
        .get(medicalrecords.read)
        .put(medicalrecords.update)
        .delete(medicalrecords.delete);

    // Patient's Medical Records
    app.route('/api/medicalrecords/patient/:patientId').all(medicalrecordsPolicy.isAllowed)
        .get(medicalrecords.listByPatient);


    // Finish by binding the medical record middleware
    app.param('medicalrecordId', medicalrecords.medicalrecordByID);
    app.param('patientId', medicalrecords.medicalrecordByPatientID);
};
