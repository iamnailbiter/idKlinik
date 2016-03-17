'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
    mongoose = require('mongoose'),
    Queue = mongoose.model('Queue'),
    MedicalRecord = mongoose.model('MedicalRecord'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Entry new queue
 */
exports.create = function (req, res) {
    var queue = new Queue(req.body);
    queue.user = req.user;
    queue.clinic = req.user.clinic;

    queue.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(queue);
        }
    });
};

/**
 * Show the current queue
 */
exports.read = function (req, res) {
    // convert mongoose document to JSON
    var queue = req.queue ? req.queue.toJSON() : {};

    // Add a custom field to the Queue, for determining if the current User is the "owner".
    // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Queue model.
    queue.isCurrentUserOwner = req.user && queue.user && queue.user._id.toString() === req.user._id.toString() ? true : false;

    res.json(queue);
};

/**
 * Update queue data
 */
exports.update = function (req, res) {
    var queue = req.queue;

    queue.updated = Date.now();

    if(!queue.medicalrecord){
        var medicalrecord = new MedicalRecord();
        medicalrecord.user = req.user;
        medicalrecord.queue = queue._id;
        medicalrecord.patient = queue.patient;
        medicalrecord.save(function (err,doc) {
            if (err) {
                return res.status(400).send({
                    message: errorHandler.getErrorMessage(err)
                });
            } else {
                queue.medicalrecord = doc.id;
                queue.save(function (err) {
                    if (err) {
                        return res.status(400).send({
                            message: errorHandler.getErrorMessage(err)
                        });
                    }
                });
            }
        });
    }

    if(req.body.directionHandledId){

        Queue.findOneAndUpdate(
            { _id: queue._id, 'direction._id': req.body.directionHandledId },
            {
                $set: {
                    'direction.$.handled': Date.now()
                }
            },
            function(err) {
                if (err) {
                    return res.status(400).send({
                        message: errorHandler.getErrorMessage(err)
                    });
                }else {
                    res.json(queue);
                }
            }
        );
    }

    if(req.body.directionNext){
        var today = new Date().toISOString().substring(0, 10);

        Queue.find()
            .where('created').gt(today).lt(new Date())
            .sort('-created')
            .populate('user', 'displayName')
            .exec(function (err) {
                if (err) {
                    return res.status(400).send({
                        message: errorHandler.getErrorMessage(err)
                    });
                } else {
                    queue.direction.push({
                        target:req.body.directionNext,
                        number:req.body.directionNumber
                    });
                    queue.save(function (err) {
                        if (err) {
                            return res.status(400).send({
                                message: errorHandler.getErrorMessage(err)
                            });
                        }
                    });
                }
            });
    }

    //queue.save(function (err) {
    //    if (err) {
    //        return res.status(400).send({
    //            message: errorHandler.getErrorMessage(err)
    //        });
    //    } else {
    //        res.json(queue);
    //    }
    //});
};

/**
 * Delete a queue
 */
exports.delete = function (req, res) {
    var queue = req.queue;

    queue.remove(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(queue);
        }
    });
};

/**
 * List of Queues
 */
exports.list = function (req, res) {
    var ownClinic = {};
    if(req.user.clinic){
        ownClinic = { clinic:req.user.clinic };
    }

    Queue.find(ownClinic).sort('-created')
        .populate('user', 'displayName')
        .populate('patient', 'name sex')
        .populate('clinic', 'name')
        .exec(function (err, queues) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(queues);
        }
    });
};

/**
 * Queue middleware
 */
exports.queueByID = function (req, res, next, id) {

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({
            message: 'Queue is invalid'
        });
    }

    Queue.findById(id)
        .populate('user', 'displayName')
        .populate('patient', 'name')
        .populate('clinic', 'name')
        .exec(function (err, queue) {
        if (err) {
            return next(err);
        } else if (!queue) {
            return res.status(404).send({
                message: 'No queue with that identifier has been found'
            });
        }
        req.queue = queue;
        next();
    });
};
