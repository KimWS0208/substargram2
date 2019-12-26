import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, ".env") });

import { adjectives, nouns } from "./words"
import nodemailer from "nodemailer";
import sgTransport from "nodemailer-sendgrid-transport";
import jwt from "jsonwebtoken";

export const generateSecret = () => {
    const randomNumber = Math.floor(Math.random() * adjectives.length)
    return `${ adjectives[randomNumber] } ${ nouns[randomNumber] }`
}

const nodemailer2 = require('nodemailer');
// console.log("nodemalier==",nodemailer)

const mg = require('nodemailer-mailgun-transport');
// console.log("mg==",mg)

// This is your API key that you retrieve from www.mailgun.com/cp (free up to 10K monthly emails)
const auth = {
  auth: {
    api_key: '8ed5f9f922a5f2c010a25a26ae84fe74-a9919d1f-12f37537',
    // domain: 'mg.wsdomain.com'
    domain: 'sandbox494edd75be4d4e21ae2e4f77b64840e6.mailgun.org'
  },
//   proxy: 'http://localhost:4000' // optional proxy, default is false
}
// console.log("mg(auth)===",mg(auth))

const nodemailerMailgun = nodemailer2.createTransport(mg(auth));
// console.log("nodemailerMailgun==",nodemailerMailgun)

export const mailGunSendMail = (adress, secret) =>{
    nodemailerMailgun.sendMail({
        from: 'smool_yeolhansal@haechan.com',
        to: adress, // An array if you have multiple recipients.
        subject: 'Login Secret for substargram',
        // html: `Hello! Your login secret is <strong>${secret}</strong>.<br/> copy 1233462sdgf2`,
        html:'hahaha'

        }, 
        (err, info) => {
            if (err) {
                console.log(`Error: ${err}`);
            }
            else {
                console.log(`Response: ${info}`);
            }
    })

    // const email = {
    //     from: 'smool_yeolhansal@haechan.com',
    //     to: adress, // An array if you have multiple recipients.
    //     // cc:'second@domain.com',
    //     // bcc:'secretagent@company.gov',
    //     subject: 'Login Secret for substargram',
    //     //You can use "html:" to send HTML email content. It's magic!
    //     // html: `mearong`
    //     html: `Hello! Your login secret is <strong>${secret}</strong>.<br/> copy 1233462sdgf2`
    //     //You can use "text:" to send plain-text content. It's oldschool!
    //     // text: 'Mailgun rocks, pow pow!'
    // }
    // return nodemailerMailgun.sendMail(email)
    // , (err, info) => {
    //     if (err) {
    //       console.log(`Error: ${err}`);
    //     }
    //     else {
    //       console.log(`Response: ${info}`);
    //     }    
}


// import sgMail from '@sendgrid/mail';


export const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET);


// console.log(process.env.SENDGRID_USERNAME, process.env.SENDGRID_PASSWORD)

// export const sendmail = email => {
//     const options = {
//         auth: {
//             api_user: process.env.SENDGRID_USERNAME,
//             api_key: process.env.SENDGRID_PASSWORD
//         }
//     }
//     const client = nodemailer.createTransport(sgTransport(options));
//     return client.sendMail(email)
    
// }

// export const sendSecretMail = (adress, secret) => {
//     const email = {
//         from: "WS@substargram.com",
//         to: adress,
//         subject: "Login Secret for substargram",
//         html: `Hello! Your login secret is <strong>${secret}</strong>.<br/> copy`
//     }
//     return sendmail(email)
// }