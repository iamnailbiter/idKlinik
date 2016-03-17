'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
    mongoose = require('mongoose'),
    Patient = mongoose.model('Patient'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Register new patient
 */
exports.create = function (req, res) {
    var patient = new Patient(req.body);
    patient.user = req.user;
    patient.clinic = req.user.clinic;

    patient.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(patient);
        }
    });
};

/**
 * Show the current patient
 */
exports.read = function (req, res) {
    // convert mongoose document to JSON
    var patient = req.patient ? req.patient.toJSON() : {};

    // Add a custom field to the Patient, for determining if the current User is the "owner".
    // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Patient model.
    patient.isCurrentUserOwner = req.user && patient.user && patient.user._id.toString() === req.user._id.toString() ? true : false;

    res.json(patient);
};

/**
 * Update patient data
 */
exports.update = function (req, res) {
    var patient = req.patient;

    patient.idcard_type = req.body.idcard_type;
    patient.idcard_number = req.body.idcard_number;
    patient.name = req.body.name;
    patient.birthplace = req.body.birthplace;
    patient.birthdate = req.body.birthdate;
    patient.sex = req.body.sex;
    patient.address = req.body.address;
    patient.domicile = req.body.domicile;
    patient.job = req.body.job;
    patient.phone = req.body.phone;
    patient.updated = Date.now();

    patient.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(patient);
        }
    });
};

/**
 * Delete a patient
 */
exports.delete = function (req, res) {
    var patient = req.patient;

    patient.remove(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(patient);
        }
    });
};

/**
 * List of Patients
 */
exports.list = function (req, res) {

    var ownClinic = {};
    if(req.user.clinic){
        ownClinic = { clinic:req.user.clinic };
    }

    Patient.find(ownClinic).sort('-registered')
        .populate('user', 'displayName')
        .populate('clinic', 'name')
        .exec(function (err, patients) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(patients);
        }
    });
};

/**
 * Patient middleware
 */
exports.patientByID = function (req, res, next, id) {

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({
            message: 'Patient is invalid'
        });
    }

    Patient.findById(id)
        .populate('user', 'displayName')
        .populate('clinic', 'name')
        .exec(function (err, patient) {
        if (err) {
            return next(err);
        } else if (!patient) {
            return res.status(404).send({
                message: 'No patient with that identifier has been found'
            });
        }
        req.patient = patient;
        next();
    });
};
