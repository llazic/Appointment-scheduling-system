const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const validacija = require('./validacija');
const sha256 = require('js-sha256');
const { KorisnikModel } = require('./modeli/korisnik-model');
const { FirmaModel } = require('./modeli/firma-model');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/zakazirs', { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log('Connected to db'));

const router = express.Router();

/** Registracija klijenta **/
router.route('/klijent').post(async (req, res, next) => {
    const result = validacija.validirajKlijenta(req.body);
    if (result.error) return res.status(400).json({ poruka : 'Neispravan zahtev.' });

    const k = await KorisnikModel.find({ email: req.body.email }).exec();
    if (k.length !== 0) return res.json({ poruka: 'Već postoji korisnik sa tom email adresom.' });

    const hash_lozinke = sha256(req.body.lozinka);

    let klijent = new KorisnikModel({
        ime: req.body.ime,
        prezime: req.body.prezime,
        email: req.body.email,
        hash_lozinke: hash_lozinke,
        tip: 'klijent'
    });

    klijent.save();

    res.json(klijent);
});

/** Registracija firme **/
router.route('/firma').post(async (req, res, next) => {
    const result = validacija.validirajFirmu(req.body);
    if (result.error) return res.status(400).json({ poruka : 'Neispravan zahtev.', error : result.error.details });

    const f = await FirmaModel.find({ email: req.body.email }).exec();
    if (f.length !== 0) return res.json({ poruka: 'Već postoji korisnik sa tom email adresom.' });

    const hash_lozinke = sha256(req.body.lozinka);

    let firma = new FirmaModel({
        naziv: req.body.naziv,
        opis: req.body.opis,
        email: req.body.email,
        hash_lozinke: hash_lozinke,
        adresa: req.body.adresa
    });

    firma.save();

    res.json(firma);
});

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



app.use('/', router);
const PORT = 3232;
app.listen(PORT, () => { console.log(`Server is running on port ${PORT}`) });