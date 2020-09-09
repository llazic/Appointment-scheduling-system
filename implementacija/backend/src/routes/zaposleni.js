const express = require('express');
const { KorisnikModel } = require('../modeli/korisnik-model');
const { RadniDaniModel } = require('../modeli/radni-dan-model');
const { FirmaModel } = require('../modeli/firma-model');
const router = express.Router();
const slanjeMaila = require('../slanje-maila');
const validacija = require('../validacija');


router.get('/zaposleni/:firma_id', async (req, res, next) => {
    let zaposleni = await KorisnikModel.find({ firma_id: req.params.firma_id }).exec();
    res.json(zaposleni);
})

router.delete('/zaposleni/:zaposleni_id', async (req, res, next) => {
    const zaposleni_id = req.params.zaposleni_id;
    let radniDaniUBuducnosti = await RadniDaniModel.find({ zaposleni_id: zaposleni_id }).exec();
    for (let radniDan of radniDaniUBuducnosti) {
        for (let termin of radniDan.termini) {
            if (termin.zauzet === true) return res.json({ poruka: 'Zaposleni ima zakazane termine u budućnosti. Možete ga otpustiti nakon toga.' });
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

router.put('/zaposleni/:zaposleni_id', async (req, res, next) => {
    console.log(req.body.usluge);
    let zaposleni = await KorisnikModel.updateOne({ _id: req.params.zaposleni_id }, { $set: { usluge: req.body.usluge } }).exec();

    res.json(zaposleni);
});

module.exports = router;