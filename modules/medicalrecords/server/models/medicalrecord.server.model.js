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
    bpm: {                              // Blood Pressure Monitor
        up: {
            type: Number,
            default: ''
        },
        down: {
            type: Number,
            default: ''
        }
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
    ms: {
        kk: {       // Meningeal Sign KK
            type: String,
            default: ''
        },
        br1: {      // Meningeal Sign BR I
            type: String,
            default: ''
        },
        br2: {      // Meningeal Sign BR II
            type: String,
            default: ''
        }
    },
    nnc: {  // NN Cranialis
        type: String,
        default: ''
    },
    motor: { // Saraf Motorik
        a: {
            type: Number,
            default: ''
        },
        b: {
            type: Number,
            default: ''
        },
        c: {
            type: Number,
            default: ''
        },
        d: {
            type: Number,
            default: ''
        }
    },
    sensory: {          // Saraf Sensorik
        val: {
            type: String,
            default: ''
        },
        a: {
            type: Number,
            default: ''
        },
        b: {
            type: Number,
            default: ''
        },
        c: {
            type: Number,
            default: ''
        },
        d: {
            type: Number,
            default: ''
        }
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
    bpr: {
        left: {
            type: Number,
            default: ''
        },
        right: {
            type: Number,
            default: ''
        }
    },
    trr: {
        left: {
            type: Number,
            default: ''
        },
        right: {
            type: Number,
            default: ''
        }
    },
    kpr: {
        left: {
            type: Number,
            default: ''
        },
        right: {
            type: Number,
            default: ''
        }
    },
    apr: {
        left: {
            type: Number,
            default: ''
        },
        right: {
            type: Number,
            default: ''
        }
    },
    rp: {
        ht: {
            type: String,
            default: ''
        },
        bab: {
            type: String,
            default: ''
        }
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
