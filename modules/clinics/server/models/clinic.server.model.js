'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Clinic Schema
 */
var ClinicSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date,
        default: '',
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    name: {
        type: String,
        default: ''
    },
    province: {
        type: String,
        default: ''
    },
    city: {
        type: String,
        default: ''
    },
    address: {
        type: String,
        default: ''
    },
    phone: {
        type: String,
        default: ''
    },
    fax: {
        type: String,
        default: ''
    },
    poly: {
        type: [{
            type: String,
            enum: ['general','neurological']
        }],
        default: ['general'],
        required: 'Please provide at least one poly'
    },
    license: {
        type: String,
        default: ''
    },
    expired: {
        type: String,
        default: ''
    }
});

mongoose.model('Clinic', ClinicSchema);
