const express = require('express');
const router = express.Router();
const validacija = require('../validacija');
const { FirmaModel } = require('../modeli/firma-model');
const { UslugaModel } = require('../modeli/usluga-model');

/**
 * Dohvatanje usluga po firmi
 */
router.get('/usluge/:firma_id', async function(req, res, next) {
    let usluge = await UslugaModel.find({ firma_id : req.params.firma_id }).exec();
    res.json(usluge);
});

/**
 * Kreiranje usluge
 */
router.post('/usluga', async function(req, res, next) {
    const result = validacija.validirajUslugu(req.body);
    if (result.error) console.log(result.error);
    if (result.error) return res.status(400).json({ poruka : 'Neispravan zahtev.' });

    const firma = await FirmaModel.find({ _id : req.body.firma_id }).exec();
    if (firma.length === 0) return res.status(400).json({ poruka : 'Neispravan zahtev: Firma ne postoji. '});

    const u = await UslugaModel.find({ naziv : req.body.naziv, firma_id : req.body.firma_id }).exec();
    if (u.length !== 0) return res.json({ poruka: 'Već imate uslugu sa tim nazivom.' });

    let usluga = new UslugaModel({
        naziv : req.body.naziv, 
        trajanje : req.body.trajanje,
        cena : req.body.cena,
        firma_id : req.body.firma_id
    });

    usluga.save();

    res.json(usluga);
});

module.exports = router;