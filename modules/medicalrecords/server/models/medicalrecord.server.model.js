'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Anamnesis Schema
 */
var AnamnesisSchema = new Schema({
    complaint: {
        type: String,
        default: ''
        // required: 'Isi dengan keluhan utama yang dirasakan oleh pasien'
    },
    hocd: {                             // History of Current Disease
        type: String,
        default: ''
    },
    bpmup: {
            type: Number,
            default: ''
        },
    bpmdown: {
            type: Number,
            default: ''
        },
    inhalation: {
        type: Number,
        default: ''
    },
    pulse: {
        type: Number,
        default: ''
    },
    temperature: {
        type: Number,
        default: ''
    },
    bodyheight: {
        type: Number,
        default: ''
    },
    bodyweight: {
        type: Number,
        default: ''
    }
});

/**
 * Internus Schema
 */
var InternusSchema = new Schema({
    cor: {
        type: String,
        default: ''
    },
    abd: {
        type: String,
        default: ''
    },
    pulmo: {
        type: String,
        default: ''
    },
    hepar: {
        type: String,
        default: ''
    },
    lien: {
        type: String,
        default: ''
    }
});

/**
 * Neurologic Record Schema
 */
var NeurologicSchema = new Schema({
    cgs: {          // Kesadaran CGS
        type: String,
        default: ''
    },
    mskk: {       // Meningeal Sign KK
        type: String,
        default: ''
    },
    msbr1: {      // Meningeal Sign BR I
            type: String,
            default: ''
    },
    msbr2: {      // Meningeal Sign BR II
            type: String,
            default: ''
    },
    nnc: {  // NN Cranialis
        type: String,
        default: ''
    },
    motora: {
            type: Number,
            default: ''
    },
    motorb: {
            type: Number,
            default: ''
    },
    motorc: {
            type: Number,
            default: ''
        }, 
    motord: {
            type: Number,
            default: ''
    },
    sensoryval: {
            type: String,
            default: ''
    },
    sensorya: {
            type: Number,
            default: ''
    },
    sensoryb: {
            type: Number,
            default: ''
    },
    sensoryc: {
            type: Number,
            default: ''
    },
    sensoryd: {
            type: Number,
            default: ''
        },
    // rf: {
    //     a: {
    //         type: Number,
    //         default: ''
    //     },
    //     b: {
    //         type: Number,
    //         default: ''
    //     },
    //     c: {
    //         type: Number,
    //         default: ''
    //     },
    //     d: {
    //         type: Number,
    //         default: ''
    //     }
    // },
    bprleft: {
            type: Number,
            default: ''
        },
    bprright: {
            type: Number,
            default: ''
    },
    trrleft: {
            type: Number,
            default: ''
    },
    trrright: {
            type: Number,
            default: ''
    },
    kprleft: {
            type: Number,
            default: ''
    },
    kprright: {
            type: Number,
            default: ''
    },
    aprleft: {
            type: Number,
            default: ''
    },
    aprright: {
            type: Number,
            default: ''
    },
    rpht: {
            type: String,
            default: ''
    },
    rpbab: {
            type: String,
            default: ''
    },
    autonomous: {
        type: String,
        default: ''
    },
    cv: {
        type: String,
        default: ''
    }
});


/**
 * Diagnosis Record Schema
 */
var DiagnosisSchema = new Schema({
    clinical: {
        type: String,
        default: ''
    },
    topical: {
        type: String,
        default: ''
    },
    etiological: {
        type: String,
        default: ''
    },
    therapy: {
        type: String,
        default: ''
    },
    control: {
        type: String,
        default: ''
    }
});

/**
 * SOAP Record Schema
 */
var SoapSchema = new Schema({
    subjective: {
        type: String,
        default: ''
    },
    objective: {
        type: String,
        default: ''
    },
    assessment: {
        type: String,
        default: ''
    },
    plan: {
        type: String,
        default: ''
    }
});
/**
 * Medical Record Schema
 */
var MedicalRecordSchema = new Schema({
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
    medic: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    doctor: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    patient: {
        type: Schema.ObjectId,
        ref: 'Patient'
    },
    queue: {
        type: Schema.ObjectId,
        ref: 'Queue'
    },
    anamnesis: AnamnesisSchema,
    internus: InternusSchema,
    neurologic: NeurologicSchema,
    diagnosis: DiagnosisSchema,
    soap: SoapSchema
});

mongoose.model('MedicalRecord', MedicalRecordSchema);
