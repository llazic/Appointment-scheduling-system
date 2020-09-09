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

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log('Connected to db'));

const router = express.Router();

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


app.use('/', zaposleni);
app.use('/', registracije);
app.use('/', usluge);
app.use('/', router);
const PORT = 3232;
app.listen(PORT, () => { console.log(`Server is running on port ${PORT}`) });