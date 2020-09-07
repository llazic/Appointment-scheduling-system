const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let Usluga = new Schema({
    naziv: String,
    cena: Number,
    trajanje: Number,
    firma_id: String
});

exports.UslugaModel = mongoose.model('Usluga', Usluga, 'usluge');