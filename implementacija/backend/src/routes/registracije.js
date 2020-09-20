const express = require('express');
const router = express.Router();

const slanjeMaila = require('../slanje-maila');
const validacija = require('../validacija');
const sha256 = require('js-sha256');
const randomstring = require("randomstring");
const { KorisnikModel } = require('../modeli/korisnik-model');
const { FirmaModel } = require('../modeli/firma-model');

/** Registracija klijenta **/
router.route('/klijent').post(async (req, res, next) => {
    const result = validacija.validirajKlijenta(req.body);
    if (result.error) console.log(result.error);
    if (result.error) return res.status(400).json({ poruka : 'Neispravan zahtev.' });

    const k = await KorisnikModel.find({ email: req.body.email }).exec();
    if (k.length !== 0) return res.json({ poruka: 'Već postoji korisnik sa tom email adresom.' });
    const f = await FirmaModel.find({ email : req.body.email }).exec();
    if (f.length !== 0) return res.json({ poruka: 'Već postoji korisnik sa tom email adresom.' });

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

/** Pravljenje zaposlenog **/
router.route('/zaposleni').post(async (req, res, next) => {
    const result = validacija.validirajZaposlenog(req.body);
    if (result.error) console.log(result.error);
    if (result.error) return res.status(400).json({ poruka : 'Neispravan zahtev.' });

    const firme = await FirmaModel.find({ _id : req.body.firma_id }).exec();
    if (firme.length === 0) return res.status(400).json({ poruka : 'Neispravan zahtev: Firma ne postoji.'});

    const k = await KorisnikModel.find({ email: req.body.email }).exec();
    if (k.length !== 0) return res.json({ poruka: 'Već postoji korisnik sa tom email adresom.' });
    const f = await FirmaModel.find({ email : req.body.email }).exec();
    if (f.length !== 0) return res.json({ poruka: 'Već postoji korisnik sa tom email adresom.' });

    let lozinka = randomstring.generate(15);
    const hash_lozinke = sha256(lozinka);

    let zaposleni = new KorisnikModel({
        ime: req.body.ime,
        prezime: req.body.prezime,
        email: req.body.email,
        hash_lozinke: hash_lozinke,
        tip: 'zaposleni',
        firma_id: req.body.firma_id,
        usluge: req.body.usluge,
    });

    zaposleni.save();

    //slanje mail-a
    slanjeMaila.saljiMail('Registracija na Zakazi.rs', 
        `Poštovani, \n\n` + 
        `Vaš poslodavac "${firme[0].naziv}" Vas je registrovao kao svog zaposlenog.\n` + 
        `Na svoj nalog se možete prijaviti na sajtu zakazi.rs sa sledećim kredencijalima: \n\n` + 
        `email: ${req.body.email}\n` + 
        `lozinka: ${lozinka}\n\n` + 
        `Ova lozinka je nasumično generisana i predstavlja jaku lozinku. Vaš poslodavac je ne zna, a ukoliko želite, možete je promeniti kad se prijavite.\n\n` + 
        `Pozdrav,\n` + 
        `Vaš Zakazi.rs`,
        req.body.email);

    res.json(zaposleni);
});

/** Registracija firme **/
router.route('/firma').post(async (req, res, next) => {
    const result = validacija.validirajFirmu(req.body);
    if (result.error) console.log(result.error);
    if (result.error) return res.status(400).json({ poruka : 'Neispravan zahtev.', error : result.error.details });

    const k = await KorisnikModel.find({ email: req.body.email }).exec();
    if (k.length !== 0) return res.json({ poruka: 'Već postoji korisnik sa tom email adresom.' });
    const f = await FirmaModel.find({ email: req.body.email }).exec();
    if (f.length !== 0) return res.json({ poruka: 'Već postoji korisnik sa tom email adresom.' });

    const fi = await FirmaModel.find({ naziv : req.body.naziv }).exec();
    if (fi.length !== 0) return res.json({ poruka: 'Već postoji firma sa tim nazivom.' });

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

module.exports = router;