require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const sha256 = require('js-sha256');

const { KorisnikModel } = require('./modeli/korisnik-model');
const { FirmaModel } = require('./modeli/firma-model');

const registracije = require('./routes/registracije');
const zaposleni = require('./routes/zaposleni');
const usluge = require('./routes/usluge');
const termini = require('./routes/termini');
const { RadniDaniModel } = require('./modeli/radni-dan-model');
const { UslugaModel } = require('./modeli/usluga-model');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log('Connected to db'));

const router = express.Router();

/**
 * Dohvatanje firme
 */
app.get('/firma/:firma_id', async(req, res, next) => {
    const firma_id = req.params.firma_id;
    const firma = await FirmaModel.findById(firma_id).select('naziv opis adresa').exec();
    res.json(firma);
})

/**
 * Prijavljivanje na sistem
 */
app.post('/prijava', async (req, res, next) => {
    if (!req.body.email || !req.body.lozinka) return res.sendStatus(400);

    const klijent = await KorisnikModel.findOne({ email: req.body.email }).exec();
    if (klijent) {
        const hash_lozinke = sha256(req.body.lozinka);
        if (klijent.hash_lozinke === hash_lozinke) return res.json(klijent);
        else return res.json({ poruka: 'Lozinka nije odgovarajuća.' });
    }

    const firma = await FirmaModel.findOne({ email: req.body.email }).exec();
    if (firma) {
        const hash_lozinke = sha256(req.body.lozinka);
        if (firma.hash_lozinke === hash_lozinke) return res.json(firma);
        else return res.json({ poruka: 'Lozinka nije odgovarajuća.' });
    }

    return res.json({ poruka: 'Ne postoji korisnik sa tom email adresom.' });
});

/**
 * Pretraga po zadatom pojmu
 */
app.get('/pretraga/:pojam', async (req, res, next) => {
    const pojam = req.params.pojam;

    let pojmovi = pojam.split(' ');
    let nizPojmova = []
    for (let p of pojmovi) {
        let re = `.*${p}.*`;
        let pojam = new RegExp(re, "i");
        nizPojmova.push(pojam);
    }

    let firme = await FirmaModel.find({ naziv: { $in: nizPojmova } }).select('naziv opis adresa').exec();
    let usluge = await UslugaModel.find({ naziv: { $in: nizPojmova } }).select('naziv firma_id').exec();

    for (let u of usluge) {
        if (!(firme.find(f => f._id.equals(u.firma_id)))) {
            let novaFirma = await FirmaModel.findOne({ _id: u.firma_id }).select('naziv opis adresa').exec();
            firme.push(novaFirma);
        }
    }
    res.json(firme);
});

app.use('/', zaposleni);
app.use('/', registracije);
app.use('/', usluge);
app.use('/', termini);
app.use('/', router);
const PORT = 3232;

/**
 * Log da je pokrenut server
 */
app.listen(PORT, () => { console.log(`Server is running on port ${PORT}`) });