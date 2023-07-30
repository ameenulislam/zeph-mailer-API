const express = require('express');
const router = express.Router();
const nodeMailer = require('nodemailer');
const EmailSchema = require('../models/email_account_model');

let accountId = 0;
let status = false;
let message = '';

router.post('/', async(req, res) =>{
    const user = new EmailSchema({
        name :req.body.name,
        email: req.body.email,
        password : req.body.password,
        port: req.body.port,
        smtphost : req.body.smtphost,
        secure : req.body.secure,
    })

    try {
        const existingUser = await EmailSchema.findOne({ email: req.body.email });

        if (existingUser) {
            status = false;
            message = 'user already exists with this email address';

            const customResponse = {
                id: user.accountId,
                status: status, 
                message : message,
                details: {
                    name : user.name,
                    email : user.email
                },
            };
            res.json(customResponse);
        } else {
            const transporter = await nodeMailer.createTransport({
                host: user.smtphost,
                port: user.port,
                secure: user.secure, // Set to true for SSL connections, false for TLS
                auth: {
                  user: user.email,
                  pass: user.password
                },
            });

           await transporter.verify( async (error, success) => {
                if (error) {
                    status = false;
                    message = error.message
                    console.log("Something wrong with the mailer");

                    const customResponse = {
                        id: user.userId,
                        status: status, 
                        message : message,
                        details: {
                            name : user.name,
                            email : user.email
                        },
                    };
                    res.json(customResponse);
                } else {
                    accountId++; 
                    user.userId = accountId; 
                    status = true;
                    message = 'Account successfully added'
                    
                    await user.save();

                    const customResponse = {
                        id: user.userId,
                        status: status, 
                        message : message,
                        details: {
                            name : user.name,
                            email : user.email
                        },
                    };
                    res.json(customResponse);
                    
                  console.log('Transporter is ready to send emails');
                }
            });

           
        }

        

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})


module.exports = router;