'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
    mongoose = require('mongoose'),
    Clinic = mongoose.model('Clinic'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a clinic
 */
exports.create = function (req, res) {
    var clinic = new Clinic(req.body);
    clinic.user = req.user;

    clinic.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(clinic);
        }
    });
};

/**
 * Show the current clinic
 */
exports.read = function (req, res) {
    // convert mongoose document to JSON
    var clinic = req.clinic ? req.clinic.toJSON() : {};

    // Add a custom field to the Clinic, for determining if the current User is the "owner".
    // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Clinic model.
    clinic.isCurrentUserOwner = req.user && clinic.user && clinic.user._id.toString() === req.user._id.toString() ? true : false;

    res.json(clinic);
};

/**
 * Update a clinic
 */
exports.update = function (req, res) {
    var clinic = req.clinic;

    clinic.updated = Date.now();
    clinic.name = req.body.name;
    clinic.province = req.body.province;
    clinic.city = req.body.city;
    clinic.address = req.body.address;
    clinic.phone = req.body.phone;
    clinic.fax = req.body.fax;
    clinic.poly = req.body.poly;
    clinic.license = req.body.license;
    clinic.expired = req.body.expired;

    clinic.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(clinic);
        }
    });
};

/**
 * Delete a clinic
 */
exports.delete = function (req, res) {
    var clinic = req.clinic;

    clinic.remove(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(clinic);
        }
    });
};

/**
 * List of Clinics
 */
exports.list = function (req, res) {
    Clinic.find().sort('-created').populate('user', 'displayName').exec(function (err, clinics) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(clinics);
        }
    });
};

/**
 * Clinic middleware
 */
exports.clinicByID = function (req, res, next, id) {

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({
            message: 'Clinic is invalid'
        });
    }

    Clinic.findById(id).populate('user', 'displayName').exec(function (err, clinic) {
        if (err) {
            return next(err);
        } else if (!clinic) {
            return res.status(404).send({
                message: 'No clinic with that identifier has been found'
            });
        }
        req.clinic = clinic;
        next();
    });
};
