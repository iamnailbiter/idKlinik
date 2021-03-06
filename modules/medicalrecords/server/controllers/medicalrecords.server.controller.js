'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
    mongoose = require('mongoose'),
    MedicalRecord = mongoose.model('MedicalRecord'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create an medical record
 */
exports.create = function (req, res) {
    var medicalrecord = new MedicalRecord (req.body);
    medicalrecord.user = req.user;

    medicalrecord.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(medicalrecord);
        }
    });
};

/**
 * Show the current medical record
 */
exports.read = function (req, res) {
    // convert mongoose document to JSON
    var medicalrecord = req.medicalrecord ? req.medicalrecord.toJSON() : {};

    // Add a custom field to the Medical Record, for determining if the current User is the "owner".
    // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Medical Record model.
    medicalrecord.isCurrentUserOwner = req.user && medicalrecord.user && medicalrecord.user._id.toString() === req.user._id.toString() ? true : false;

    res.json(medicalrecord);
};

/**
 * Update an medical record
 */
exports.update = function (req, res) {
    var medicalrecord = req.medicalrecord;

    // Field that will be update
    medicalrecord.updated = Date.now();

    // Anamnesis Update
    if(req.body.anamnesis){
        MedicalRecord.findOneAndUpdate(
            { _id: medicalrecord._id },
            {
                $set: {
                    'updated':Date.now(),
                    'medic' : req.body.medic?req.body.medic:req.user,
                    'anamnesis.complaint': req.body.anamnesis.complaint,
                    'anamnesis.hocd': req.body.anamnesis.hocd,
                    'anamnesis.bpmup': req.body.anamnesis.bpmup?req.body.anamnesis.bpmup:0,
                    'anamnesis.bpmdown': req.body.anamnesis.bpmdown?req.body.anamnesis.bpmdown:0,
                    'anamnesis.inhalation': req.body.anamnesis.inhalation?req.body.anamnesis.inhalation:0,
                    'anamnesis.pulse': req.body.anamnesis.pulse?req.body.anamnesis.pulse:0,
                    'anamnesis.temperature': req.body.anamnesis.temperature?req.body.anamnesis.temperature:0,
                    'anamnesis.bodyheight': req.body.anamnesis.bodyheight?req.body.anamnesis.bodyheight:0,
                    'anamnesis.bodyweight': req.body.anamnesis.bodyweight?req.body.anamnesis.bodyweight:0
                }
            },
            function(err) {
                if (err) {
                    return res.status(400).send({
                        message: errorHandler.getErrorMessage(err)
                    });
                }
            }
        );
    }

    // Internus Update
    if(req.body.internus){
        MedicalRecord.findOneAndUpdate(
            { _id: medicalrecord._id },
            {
                $set: {
                    'updated':Date.now(),
                    'doctor' : req.user,
                    'internus.cor': req.body.internus.cor,
                    'internus.abd': req.body.internus.abd,
                    'internus.pulmo': req.body.internus.pulmo,
                    'internus.hepar': req.body.internus.hepar,
                    'internus.lien': req.body.internus.lien,
                    'internus.lab': req.body.internus.lab
                }
            },
            function(err) {
                if (err) {
                    return res.status(400).send({
                        message: errorHandler.getErrorMessage(err)
                    });
                }
            }
        );
    }

    // Neurologic Update
    if(req.body.neurologic){
        MedicalRecord.findOneAndUpdate(
            { _id: medicalrecord._id },
            {
                $set: {
                    'updated':Date.now(),
                    'doctor' : req.user,
                    'neurologic.cgs': req.body.neurologic.cgs,
                    'neurologic.mskk': req.body.neurologic.mskk,
                    'neurologic.msbr1': req.body.neurologic.msbr1,
                    'neurologic.msbr2': req.body.neurologic.msbr2,
                    'neurologic.nnc': req.body.neurologic.nnc,
                    // 'neurologic.motora': req.body.neurologic.motora?req.body.neurologic.motora:0,
                    // 'neurologic.motorb': req.body.neurologic.motorb?req.body.neurologic.motorb:0,
                    // 'neurologic.motorc': req.body.neurologic.motorc?req.body.neurologic.motorc:0,
                    // 'neurologic.motord': req.body.neurologic.motord?req.body.neurologic.motord:0,
                    'neurologic.motor': req.body.neurologic.motor,
                    'neurologic.sensoryval': req.body.neurologic.sensoryval,
                    'neurologic.sensorya': req.body.neurologic.sensoryval==='an'?req.body.neurologic.sensorya:0,
                    'neurologic.sensoryb': req.body.neurologic.sensoryval==='an'?req.body.neurologic.sensoryb:0,
                    'neurologic.sensoryc': req.body.neurologic.sensoryval==='an'?req.body.neurologic.sensoryc:0,
                    'neurologic.sensoryd': req.body.neurologic.sensoryval==='an'?req.body.neurologic.sensoryd:0,
                    // 'neurologic.bprleft': req.body.neurologic.bprleft?req.body.neurologic.bprleft:0,
                    // 'neurologic.bprright': req.body.neurologic.bprright?req.body.neurologic.bprright:0,
                    // 'neurologic.trrleft': req.body.neurologic.trrleft?req.body.neurologic.trrleft:0,
                    // 'neurologic.trrright': req.body.neurologic.trrright?req.body.neurologic.trrright:0,
                    // 'neurologic.kprleft': req.body.neurologic.kprleft?req.body.neurologic.kprleft:0,
                    // 'neurologic.kprright': req.body.neurologic.kprright?req.body.neurologic.kprright:0,
                    // 'neurologic.aprleft': req.body.neurologic.aprleft?req.body.neurologic.aprleft:0,
                    // 'neurologic.aprright': req.body.neurologic.aprright?req.body.neurologic.aprright:0,
                    // 'neurologic.rpht': req.body.neurologic.rpht,
                    // 'neurologic.rpbab': req.body.neurologic.rpbab,
                    'neurologic.bpr': req.body.neurologic.bpr,
                    'neurologic.trr': req.body.neurologic.trr,
                    'neurologic.kpr': req.body.neurologic.kpr,
                    'neurologic.apr': req.body.neurologic.apr,
                    'neurologic.ht': req.body.neurologic.ht,
                    'neurologic.autonomous': req.body.neurologic.autonomous,
                    'neurologic.cv': req.body.neurologic.cv
                }
            },
            function(err) {
                if (err) {
                    return res.status(400).send({
                        message: errorHandler.getErrorMessage(err)
                    });
                }
            }
        );
    }

    // Diagnosis Update
    if(req.body.diagnosis){
        MedicalRecord.findOneAndUpdate(
            { _id: medicalrecord._id },
            {
                $set: {
                    'updated':Date.now(),
                    'doctor' : req.user,
                    'diagnosis.clinical': req.body.diagnosis.clinical,
                    'diagnosis.topical': req.body.diagnosis.topical,
                    'diagnosis.etiological': req.body.diagnosis.etiological,
                    'diagnosis.therapy': req.body.diagnosis.therapy,
                    'diagnosis.control': req.body.diagnosis.control
                }
            },
            function(err) {
                if (err) {
                    return res.status(400).send({
                        message: errorHandler.getErrorMessage(err)
                    });
                }
            }
        );
    }

    // SOAP Update
    if(req.body.soap){
        MedicalRecord.findOneAndUpdate(
            { _id: medicalrecord._id },
            {
                $set: {
                    'updated':Date.now(),
                    'doctor' : req.user,
                    'soap.subjective': req.body.soap.subjective,
                    'soap.objective': req.body.soap.objective,
                    'soap.assessment': req.body.soap.assessment,
                    'soap.plan': req.body.soap.plan
                }
            },
            function(err) {
                if (err) {
                    return res.status(400).send({
                        message: errorHandler.getErrorMessage(err)
                    });
                }
            }
        );
    }

    res.json(medicalrecord);
};

/**
 * Delete an medical record
 */
exports.delete = function (req, res) {
    var medicalrecord = req.medicalrecord;

    medicalrecord.remove(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(medicalrecord);
        }
    });
};

/**
 * List of Medical Records
 */
exports.list = function (req, res) {
    MedicalRecord.find().sort('-created').populate('user', 'displayName').exec(function (err, medicalrecords) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(medicalrecords);
        }
    });
};

/**
 * Medical Record middleware
 */
exports.medicalrecordByID = function (req, res, next, id) {

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({
            message: 'Medical Record is invalid'
        });
    }

    MedicalRecord.findById(id)
        .populate('user', 'displayName')
        .populate('medic', 'displayName')
        .populate('doctor', 'displayName')
        .populate('patient', 'name')
        .exec(function (err, medicalrecord) {
        if (err) {
            return next(err);
        } else if (!medicalrecord) {
            return res.status(404).send({
                message: 'No medical record with that identifier has been found'
            });
        }
        req.medicalrecord = medicalrecord;
        next();
    });
};

exports.medicalrecordByPatientID = function (req, res, next, id) {

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({
            message: 'Medical Record is invalid'
        });
    }

    MedicalRecord.find({ patient:id })
        .populate('user', 'displayName')
        .populate('medic', 'displayName')
        .populate('doctor', 'displayName')
        .populate('patient', 'name')
        .exec(function (err, medicalrecords) {
        if (err) {
            return next(err);
        } else if (!medicalrecords) {
            return res.status(404).send({
                message: 'No medical record with that identifier has been found'
            });
        }
        req.medicalrecords = medicalrecords;
        next();
    });
};

exports.listByPatient = function (req, res) {
    res.json(req.medicalrecords);
};
