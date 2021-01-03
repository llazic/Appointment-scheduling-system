const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let Korisnik = new Schema({
    tip: String,
    ime: String,
    prezime: String,
    email: String,
    hash_lozinke: String,
    firma_id: String,
    usluge: Array
});

exports.KorisnikModel = mongoose.model('Korisnik', Korisnik, 'korisnici');

