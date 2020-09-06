const Joi = require('joi');

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