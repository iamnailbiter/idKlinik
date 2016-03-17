'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Queue Direction Schema
 */

var QueueDirectionSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    target : {
        type: String,
        default: 'cs'
    },
    number : {
        type: Number,
        default: ''
    },
    handled: {
        type: Date,
        default: ''
    },
    priority: {
        type: Boolean,
        default: false
    },
    next:{
        type: String,
        default: ''
    }
});

/**
 * Queue Schema
 */
var QueueSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date,
        default: ''
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    patient: {
        type: Schema.ObjectId,
        ref: 'Patient'
    },
    direction : [QueueDirectionSchema],
    medicalrecord: {
        type: Schema.ObjectId,
        ref: 'MedicalRecord'
    },
    clinic: {
        type: Schema.ObjectId,
        ref: 'Clinic'
    }
});

mongoose.model('Queue', QueueSchema);
