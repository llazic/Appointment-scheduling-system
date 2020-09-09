const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let RadniDan = new Schema({
    zaposleni_id: String,
    datum: Date,
    termini: Array
});

exports.RadniDaniModel = mongoose.model('RadniDan', RadniDan, 'radniDani');