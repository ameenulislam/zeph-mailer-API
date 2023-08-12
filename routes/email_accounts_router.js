const express = require('express');
const router = express.Router();
const nodeMailer = require('nodemailer');
const UserSchema = require('../models/user_model');

let id = 1;

router.post('/addEmail', async(req, res) =>{
        try {
            const { userId, emailId, port, secure, host, emailPassword } = req.body;
        
            const user = await UserSchema.findOne({ userId: userId });
        
            if (!user) {
                const response = {
                    status : false,
                    message : "User not found"
                }
                return res.status(404).json(response);
            }

            const emailExists = user.emailAccounts.some(account => account.emailId === emailId);

            if(emailExists){
                const response = {
                    status : false,
                    message : "Email already exists"
                }
                return res.status(400).json(response);
            }

            const transporter = nodeMailer.createTransport({
                host: host,
                port: port,
                secure: secure, // upgrade later with STARTTLS
                auth: {
                  user: emailId,
                  pass: emailPassword,
                },
            });

            transporter.verify(function async (error, success) {
            if (error) {
                console.log(error);
                const response = {
                    status : false,
                    message : "A Network error occured"
                }
                return res.status(400).json(response);
            } else  {
                user.emailAccounts.push({
                    id: id,
                    emailId : emailId,
                    port: port,
                    emailPassword: emailPassword,
                    host: host,
                    secure: secure,
                });
                id++;
                user.save();

                const response = {
                    status : true,
                    message : "Email account added"
                }
                
                return res.json(response);
            }
            });

        
        
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    
});

router.post('/removeAccount', async(req,res) =>{
    try {
        const {userId, accountId} = req.body;
        
        const user = await UserSchema.findOne({userId : userId});

        if(!user){
            const response = {status: false, message: "User not found"};
            return res.json(response);
        }
        
        user.emailAccounts = user.emailAccounts.filter(account => account.id !== accountId);
        await user.save();

        const response = {status : true, message :"Account removed"}
        return res.json(response);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});



module.exports = router;