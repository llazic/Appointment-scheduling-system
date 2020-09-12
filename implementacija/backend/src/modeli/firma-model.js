const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let Firma = new Schema({
    email: String,
    hash_lozinke: String,
    naziv: String,
    opis: String,
    adresa: String
});

exports.FirmaModel = mongoose.model('Firma', Firma, 'firme');