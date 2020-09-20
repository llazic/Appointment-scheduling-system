const express = require('express');
const { KorisnikModel } = require('../modeli/korisnik-model');
const { RadniDaniModel } = require('../modeli/radni-dan-model');
const router = express.Router();
const slanjeMaila = require('../slanje-maila');
const validacija = require('../validacija');
const sha256 = require('js-sha256');


router.get('/zaposleni/:zaposleni_id', async (req, res, next) => {
    let zaposleni = await KorisnikModel.findOne({ _id: req.params.zaposleni_id, tip: 'zaposleni' }).select('ime prezime usluge firma_id tip').exec();
    res.json(zaposleni);
});


router.get('/:firma_id/zaposleni/', async (req, res, next) => {
    let zaposleni = await KorisnikModel.find({ firma_id: req.params.firma_id }).exec();
    res.json(zaposleni);
})

router.get('/zaposleni/:firma_id/:usluga_id', async (req, res, next) => {
    let zaposleni = await KorisnikModel.find({ firma_id: req.params.firma_id, usluge: req.params.usluga_id }).exec();
    res.json(zaposleni);
})

router.delete('/zaposleni/:zaposleni_id', async (req, res, next) => {
    const zaposleni_id = req.params.zaposleni_id;
    const sada = new Date();
    let radniDaniUBuducnosti = await RadniDaniModel.find({ zaposleni_id: zaposleni_id, datum : { $gt : sada } }).exec();
    for (let radniDan of radniDaniUBuducnosti) {
        for (let termin of radniDan.termini) {
            if (termin.zauzeto === true) return res.json({ poruka: 'Zaposleni ima zakazane termine u budućnosti. Možete ga otpustiti nakon toga.' });
        }
    }

    //brisanje
    const zaposleni = await KorisnikModel.findOneAndDelete({ _id: zaposleni_id }).exec();
    slanjeMaila.saljiMail('Obaveštenje',
        `Poštovani korisniče\n\n` +
        `Vaš poslodavac Vas je otpustio.\n` +
        `Više se ne možete prijaviti na Zakaži.rs sa dosadašnjim kredencijalima.\n\n` +
        `Hvala Vam na saradnji!\n` +
        `Vaš Zakaži.rs`, zaposleni.email);
    res.json(zaposleni);
})

//mora da stoji iznad router.put('/zaposleni/:zaposleni_id', ...) da bi se lepo uparila putanja
router.put('/zaposleni/promeni_lozinku', async (req, res, next) => {
    const result = validacija.validirajZahtevZaPromenuLozinke(req.body);
    if (result.error) console.log(result.error);
    if (result.error) return res.status(400).json({ poruka: 'Neispravan zahtev.' });

    let zaposleni = await KorisnikModel.findOne({ _id: req.body.zaposleni_id, tip: 'zaposleni' }).exec();
    if (!zaposleni) return res.json({ poruka: 'Ne postoji korisnik sa datim id-jem.' });

    const hash_stare_lozinke = sha256(req.body.stara_lozinka);

    if (zaposleni.hash_lozinke !== hash_stare_lozinke) return res.json({ poruka : 'Stara lozinka nije odgovarajuća.' });

    const hash_nove_lozinke = sha256(req.body.nova_lozinka);
    zaposleni.hash_lozinke = hash_nove_lozinke;
    zaposleni.save();

    res.json(zaposleni);
});


router.put('/zaposleni/:zaposleni_id', async (req, res, next) => {
    let zaposleni = await KorisnikModel.updateOne({ _id: req.params.zaposleni_id }, { $set: { usluge: req.body.usluge } }).exec();

    res.json(zaposleni);
});

module.exports = router;