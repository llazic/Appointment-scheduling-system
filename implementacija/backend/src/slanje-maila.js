//require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
});

/**
 * Slanje mejla
 * @param {*} subject 
 * @param {*} poruka 
 * @param {*} email 
 */
exports.saljiMail = function (subject, poruka, email) {
    let mailOptions = {
        from: process.env.MAIL_USER,
        to: email,
        subject: subject,
        text: poruka
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            throw error;
        } else {
            console.log("Email uspešno poslat");
        }
    });
}