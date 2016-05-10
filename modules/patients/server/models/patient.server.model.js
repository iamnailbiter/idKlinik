'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Patient Schema
 */
var PatientSchema = new Schema({
    registered: {
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
    mrnumber:{
        type: String,
        default: ''
    },
    idcard_type: {
        type: String,
        default: '',
        trim: true,
        required :'Pilih tipe identitas yang digunakan'
    },
    idcard_number: {
        type: String,
        default: '',
        trim: true,
        required: 'Isi dengan nomor kartu identitas yang sesuai dengan jenis identitas'
    },
    name: {
        type: String,
        default: '',
        trim: true,
        required: 'Isi dengan nama lengkap pasien'
    },
    birthplace: {
        type: String,
        default: '',
        trim: true,
        required: 'Tempat lahir harus diisi'
    },
    birthdate: {
        type: Date,
        default: '',
        required: 'Tanggal lahir harus diisi'
    },
    sex:{
        type: String,
        default: '',
        trim: true,
        required: 'Jenis kelamin harus diisi'
    },
    address: {
        type: String,
        default: '',
        trim: true,
        required: 'Isi dengan alamat tinggal pasien'
    },
    domicile: {
        type: String,
        default: '',
        trim: true,
        required: 'Isi dengan kota domisili pasien'
    },
    job: {
        type: String,
        default: '',
        trim: true
    },
    phone: {
        type: String,
        default: '',
        trim: true
    },
    clinic: {
        type: Schema.ObjectId,
        ref: 'Clinic'
    }
});

mongoose.model('Patient', PatientSchema);
