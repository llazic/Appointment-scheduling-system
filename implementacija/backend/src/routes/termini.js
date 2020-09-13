const express = require('express');
const { RadniDaniModel } = require('../modeli/radni-dan-model');
const { KorisnikModel } = require('../modeli/korisnik-model');
const router = express.Router();
const validacija = require('../validacija');
const { UslugaModel } = require('../modeli/usluga-model');
const slanjeMaila = require('../slanje-maila');

router.get('/termini/:firma_id/:datum', async (req, res, next) => {
    const firma_id = req.params.firma_id;
    let zaposleni = await KorisnikModel.find({ firma_id: firma_id }).select('_id').exec();
    let zaposleni_ids = [];
    for (let z of zaposleni) zaposleni_ids.push(z._id);

    let datum = new Date(req.params.datum);
    datum.setHours(0, 0, 0, 0);

    let radniDani = await RadniDaniModel.find({ datum: datum, zaposleni_id: { $in: zaposleni_ids } }).exec();
    res.json(radniDani);
});

router.get('/termini/zaposleni/:zaposleni_id/:datum', async (req, res, next) => {
    let datum = new Date(req.params.datum);
    datum.setHours(0, 0, 0, 0);
    let radniDan = await RadniDaniModel.findOne({ zaposleni_id : req.params.zaposleni_id, datum : datum}).exec();
    if (!radniDan) return res.json([]);
    radniDan = radniDan.toObject();

    for (let i = 0; i < radniDan.termini.length; i++){
        let termin = radniDan.termini[i];
        if (termin.zauzeto) {
            const klijent = await KorisnikModel.findById(termin.klijent_id).select('ime prezime').exec();
            const usluga = await UslugaModel.findById(termin.usluga_id).select('naziv cena').exec();
            radniDan.termini[i].klijent = klijent;
            radniDan.termini[i].usluga = usluga;
        }
    }

    res.json(radniDan.termini);
});

router.post('/termini/kreiraj', async (req, res, next) => {
    const result = validacija.validirajRadnoVreme(req.body);
    if (result.error) console.log(result.error);
    if (result.error) return res.status(400).json({ poruka: 'Neispravan zahtev.' });

    const zaposleni_id = req.body.zaposleni_id;
    let datumOd = new Date(req.body.datumOd);
    const datumDo = new Date(req.body.datumDo);
    const vremeOd = req.body.vremeOd;
    const vremeDo = req.body.vremeDo;
    const odabraniRadniDani = req.body.odabraniRadniDani;

    datumOd.setHours(0, 0, 0, 0);

    let vecPostojiRadniDan = false;

    for (let datum = new Date(datumOd.getTime()); datum <= datumDo; datum = new Date(datum.getTime() + 24 * 60 * 60 * 1000)) {
        if (odabraniRadniDani[datum.getDay()] === true) {
            let radniDani = await RadniDaniModel.find({ zaposleni_id: zaposleni_id, datum: datum }).exec();
            if (radniDani.length !== 0) {
                vecPostojiRadniDan = true;
                continue;
            }
            let noviRadniDan = new RadniDaniModel({
                zaposleni_id: zaposleni_id,
                datum: datum,
                termini: [
                    {
                        vreme_pocetka: vremeOd,
                        vreme_zavrsetka: vremeDo,
                        klijent_id: null,
                        zauzeto: false,
                        usluga_id: null
                    }
                ]
            });
            noviRadniDan.save();
        }
    }

    if (vecPostojiRadniDan) res.json({ info: 'Zaposlenom je za jedan ili više odabranih dana već dodeljeno radno vreme, pa to nije ponovo učinjeno.' });
    else res.json(req.body);
});


router.post('/termin/zakazi', async (req, res, next) => {
    const result = validacija.validirajTermin(req.body);
    if (result.error) console.log(result.error);
    if (result.error) return res.status(400).json({ poruka: 'Neispravan zahtev.' });

    const zaposleni = await KorisnikModel.findById(req.body.zaposleni_id).exec();
    if (!zaposleni || zaposleni.tip !== 'zaposleni') return res.status(404).json({ poruka: 'Zaposleni nije pronađen.' });

    const usluga = await UslugaModel.findById(req.body.usluga_id).exec();
    if (!usluga) return res.status(404).json({ poruka: 'Usluga nije pronađena.' });

    const klijent = await KorisnikModel.findById(req.body.klijent_id).exec();
    if (!klijent || klijent.tip !== 'klijent') return res.status(404).json({ poruka: 'Klijent nije pronađen.' });

    const vreme_pocetka = Number(req.body.vreme_pocetka);
    const vreme_zavrsetka = vreme_pocetka + usluga.trajanje;
    const satPocetka = Math.floor(vreme_pocetka / 60);
    const minutPocetka = vreme_pocetka % 60;
    let datum = new Date(req.body.datum);
    datum.setHours(satPocetka, minutPocetka, 0, 0);
    let sada = new Date();
    if (datum <= sada) return res.json({ poruka: 'Termin koji se zakazuje mora biti u budućnosti.' });

    let saljiMejl = false;
    datum.setHours(0, 0, 0, 0);
    let danas = new Date();
    danas.setHours(0, 0, 0, 0);
    //ako se zakazuje termin koji je danas kasnije u toku dana, treba obavestiti zaposlenog o tome
    if (datum.getTime() === danas.getTime()) saljiMejl = true;

    let radniDan = await RadniDaniModel.findOne({ datum: datum, zaposleni_id: zaposleni._id }).exec();
    if (!radniDan) return res.status(404).json({ poruka: 'Odabrani zaposleni ne radi odabranog datuma.' });

    let i = 0;
    for (; i < radniDan.termini.length; i++) {
        let termin = radniDan.termini[i];
        if (!(termin.zauzeto) && termin.vreme_pocetka <= vreme_pocetka && termin.vreme_zavrsetka >= vreme_zavrsetka) {
            let noviTermin = {
                klijent_id: klijent._id,
                usluga_id: usluga._id,
                vreme_pocetka: vreme_pocetka,
                vreme_zavrsetka: vreme_zavrsetka,
                zauzeto: true
            };
            radniDan.termini.push(noviTermin);

            if (termin.vreme_pocetka < vreme_pocetka) {
                let terminPre = {
                    vreme_pocetka: termin.vreme_pocetka,
                    vreme_zavrsetka: vreme_pocetka,
                    zauzeto: false
                };
                radniDan.termini.push(terminPre);
            }

            if (termin.vreme_zavrsetka > vreme_zavrsetka) {
                let terminPosle = {
                    vreme_pocetka: vreme_zavrsetka,
                    vreme_zavrsetka: termin.vreme_zavrsetka,
                    zauzeto: false
                }
                radniDan.termini.push(terminPosle);
            }

            radniDan.termini.splice(i, 1);
            radniDan.termini.sort((a, b) => { return a.vreme_pocetka - b.vreme_pocetka; });
            radniDan.save();
            res.json(radniDan);

            if (saljiMejl) {
                const satZavrsetka = Math.floor(vreme_zavrsetka / 60);
                const minutZavrsetka = vreme_zavrsetka % 60;
                slanjeMaila.saljiMail('Klijent je upravo zakazao termin kod Vas za danas',
                    `Poštovani, \n\n` +
                    `Vaš klijent ${klijent.ime} ${klijent.prezime} je zakazao današnji termin kod Vas ` +
                    `od ${ispisNaDveCifre(satPocetka)}:${ispisNaDveCifre(minutPocetka)} do ${ispisNaDveCifre(satZavrsetka)}:${ispisNaDveCifre(minutZavrsetka)} ` +
                    `za uslugu ${usluga.naziv}.\n\n` +
                    `Pozdrav,\n` +
                    `Vaš Zakazi.rs`,
                    zaposleni.email);
            }
            return;
        }
    }

    res.json({ poruka: 'Nažalost, neko je zauzeo taj termin u međuvremenu.' });
});

router.post(`/termin/otkazi`, async (req, res, next) => {
    const result = validacija.validirajZahtevZaOtkazivanjeTermina(req.body);
    if (result.error) console.log(result.error);
    if (result.error) return res.status(400).json({ poruka: 'Neispravan zahtev.' });

    let datum = new Date(req.body.datum);
    const zaposleni_id = req.body.zaposleni_id;
    const vreme_pocetka = Number(req.body.vreme_pocetka);
    const vreme_zavrsetka = Number(req.body.vreme_zavrsetka);

    const satPocetka = Math.floor(vreme_pocetka / 60);
    const minutPocetka = vreme_pocetka % 60;
    datum.setHours(satPocetka, minutPocetka, 0, 0);
    const sada = new Date();
    if (datum <= sada) return res.status(400).json({ poruka: 'Mogu se otkazivati samo termini iz budućnosti.' });

    let saljiMejl = false;
    datum.setHours(0, 0, 0, 0);
    let danas = new Date();
    danas.setHours(0, 0, 0, 0);
    //ako se otkazuje termin koji je danas kasnije u toku dana, treba obavestiti zaposlenog o tome
    if (datum.getTime() === danas.getTime()) saljiMejl = true;

    let radniDan = await RadniDaniModel.findOne({ zaposleni_id: zaposleni_id, datum: datum }).exec();
    if (!radniDan) return res.status(400).json({ poruka: 'Ne postoje termini tog datuma za tog zaposlenog.' });

    let pocetniIndeksZaBrisanje = -1;
    let brojTerminZaBrisanje = 0;
    let novoVremePocetka = -1;
    let novoVremeZavrsetka = -1;
    let pronadjenTermin = false;
    let klijent_id = null;
    for (let i = 0; i < radniDan.termini.length; i++) {
        let termin = radniDan.termini[i];

        if (termin.vreme_zavrsetka === vreme_pocetka && termin.zauzeto === false) {
            pocetniIndeksZaBrisanje = i;
            novoVremePocetka = termin.vreme_pocetka;
            brojTerminZaBrisanje++;

            continue;
        }

        if (termin.vreme_pocetka === vreme_pocetka) {
            if (termin.zauzeto === false || termin.vreme_zavrsetka !== vreme_zavrsetka) {
                return res.status(400).json({ poruka: 'Neispravan zahtev.' });
            }

            pronadjenTermin = true;

            if (pocetniIndeksZaBrisanje === -1) {
                pocetniIndeksZaBrisanje = i;
                novoVremePocetka = vreme_pocetka;
            }

            brojTerminZaBrisanje++;
            novoVremeZavrsetka = vreme_zavrsetka;

            klijent_id = termin.klijent_id;
            continue;
        }

        if (termin.vreme_pocetka === vreme_zavrsetka && termin.zauzeto === false) {
            brojTerminZaBrisanje++;
            novoVremeZavrsetka = termin.vreme_zavrsetka;
            break;
        }
    }

    if (pronadjenTermin === false) return res.status(400).json({ poruka: 'Neispravan zahtev.' });

    radniDan.termini.splice(pocetniIndeksZaBrisanje, brojTerminZaBrisanje);

    let noviTermin = {
        vreme_pocetka: novoVremePocetka,
        vreme_zavrsetka: novoVremeZavrsetka,
        zauzeto: false
    }

    radniDan.termini.push(noviTermin);
    radniDan.termini.sort((a, b) => { return a.vreme_pocetka - b.vreme_pocetka; });
    radniDan.save();

    res.json(radniDan);

    const klijent = await KorisnikModel.findById(klijent_id).exec();
    const zaposleni = await KorisnikModel.findById(zaposleni_id).exec();

    if (saljiMejl) {
        const satZavrsetka = Math.floor(vreme_zavrsetka / 60);
        const minutZavrsetka = vreme_zavrsetka % 60;
        slanjeMaila.saljiMail('Klijent je otkazao današnji termin',
            `Poštovani, \n\n` +
            `Vaš klijent ${klijent.ime} ${klijent.prezime} je otkazao današnji termin koji je prethodno zakazao kod Vas ` +
            `od ${ispisNaDveCifre(satPocetka)}:${ispisNaDveCifre(minutPocetka)} do ${ispisNaDveCifre(satZavrsetka)}:${ispisNaDveCifre(minutZavrsetka)}.\n\n` +
            `Pozdrav,\n` +
            `Vaš Zakazi.rs`,
            zaposleni.email);
    }
});

function ispisNaDveCifre(broj) {
    return broj < 10 ? '0' + broj : '' + broj;
}

router.get('/termini/:klijent_id', async (req, res, next) => {
    let sada = new Date();
    const minuti = sada.getHours() * 60 + sada.getMinutes();
    sada.setHours(0, 0, 0, 0);
    //ovde trazim ili da je datum veci od trenutnog i ima neki termin sa odgovarajucim klijentom
    //ili da je datum danasnji i ima termin sa odgovarajucim klijentom i taj termin je nekad kasnije u toku dana
    let radniDani = await RadniDaniModel.find({
        $or: [
            {
                $and: [
                    { datum: { $gt: sada } },
                    { termini: { $elemMatch: { klijent_id: req.params.klijent_id } } }
                ]
            },
            {
                $and: [
                    { datum: sada },
                    { termini: { $elemMatch: { vreme_pocetka: { $gte: minuti }, klijent_id: req.params.klijent_id } } }
                ]
            }
        ]
    }).exec();

    let termini = [];
    for (let r of radniDani) {
        for (let t of r.termini) {
            if (t.klijent_id == req.params.klijent_id) {
                let usluga = await UslugaModel.findById(t.usluga_id).exec();
                let noviTermin = {
                    klijent_id: t.klijent_id,
                    datum: r.datum,
                    vreme_pocetka: t.vreme_pocetka,
                    vreme_zavrsetka: t.vreme_zavrsetka,
                    zauzeto: t.zauzeto,
                    usluga: usluga,
                    zaposleni_id: r.zaposleni_id
                }
                termini.push(noviTermin);
            }
        }
    }

    res.json(termini);
});

module.exports = router;