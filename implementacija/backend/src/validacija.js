const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

exports.validirajKlijenta = function (klijent) {
    const schema = Joi.object({
        ime: Joi.string()
            .pattern(new RegExp('^[a-zA-Z]{1,30}$'))
            .min(1)
            .required(),

        prezime: Joi.string()
            .pattern(new RegExp('^[a-zA-Z]{1,30}$'))
            .min(1)
            .required(),

        lozinka: Joi.string()
            .min(8)
            .required(),

        email: Joi.string()
            .email()
            .required(),
    });

    return schema.validate(klijent);
}

exports.validirajZaposlenog = function (zaposleni) {
    const schema = Joi.object({
        _id: Joi.objectId(),

        ime: Joi.string()
            .pattern(new RegExp('^[a-zA-Z]{1,30}$'))
            .min(1)
            .required(),

        prezime: Joi.string()
            .pattern(new RegExp('^[a-zA-Z]{1,30}$'))
            .min(1)
            .required(),

        email: Joi.string()
            .email()
            .required(),

        firma_id: Joi.objectId()
            .required(),

        usluge: Joi.array()
            .items(
                Joi.objectId()
            )
            .required()
    });

    return schema.validate(zaposleni);
}

exports.validirajFirmu = function (firma) {
    const schema = Joi.object({
        naziv: Joi.string()
            .min(1)
            .required(),

        opis: Joi.string()
            .min(1)
            .required(),

        lozinka: Joi.string()
            .min(8)
            .required(),

        email: Joi.string()
            .email()
            .required(),

        adresa: Joi.string()
            .required()
    });

    return schema.validate(firma);
}

exports.validirajUslugu = function (usluga) {
    const schema = Joi.object({
        naziv: Joi.string()
            .min(1)
            .required(),

        trajanje: Joi.number()
            .integer()
            .positive()
            .required(),

        cena: Joi.number()
            .integer()
            .positive()
            .required(),

        firma_id: Joi.objectId()
            .required()
    });

    return schema.validate(usluga);
}

exports.validirajRadnoVreme = function (radnoVreme) {
    const schema = Joi.object({
        zaposleni_id: Joi.objectId()
            .required(),

        datumOd: Joi.date()
            .required(),

        datumDo: Joi.date()
            .required(),

        vremeOd: Joi.number()
            .required(),

        vremeDo: Joi.number()
            .required(),

        odabraniRadniDani: Joi.array()
            .items(
                Joi.bool()
            )
            .required()
    });

    return schema.validate(radnoVreme);
}

exports.validirajTermin = function (termin) {
    const schema = Joi.object({
        zaposleni_id: Joi.objectId()
            .required(),

        klijent_id: Joi.objectId()
            .required(),

        usluga_id: Joi.objectId()
            .required(),

        datum: Joi.date()
            .required(),

        vreme_pocetka: Joi.number()
            .integer()
            .min(0)
            .max(1430)
            .required()
    });

    return schema.validate(termin);
}

exports.validirajZahtevZaOtkazivanjeTermina = function (termin) {
    const schema = Joi.object({
        zaposleni_id: Joi.objectId().required(),
        datum: Joi.date().required(),
        vreme_pocetka: Joi.number()
            .integer()
            .min(0)
            .max(1430)
            .required(),
        vreme_zavrsetka: Joi.number()
            .integer()
            .min(0)
            .max(1430)
            .required(),
    });

    return schema.validate(termin);
}

exports.validirajZahtevZaPromenuLozinke = function (zahtev) {
    const schema = Joi.object({
        zaposleni_id : Joi.objectId().required(),
        stara_lozinka : Joi.string().required(),
        nova_lozinka : Joi.string().min(8).required(),
    });

    return schema.validate(zahtev);
}