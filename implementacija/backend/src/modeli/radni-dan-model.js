const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let RadniDan = new Schema({
    zaposleni_id: String,
    datum: Date,
    termini: [ {
        klijent_id : String,
        usluga_id : String,
        vreme_pocetka : Number,
        vreme_zavrsetka : Number,
        zauzeto : Boolean,
    } ]
});

exports.RadniDaniModel = mongoose.model('RadniDan', RadniDan, 'radniDani');