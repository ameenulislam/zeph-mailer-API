const express = require('express');
const router = express.Router();
const nodeMailer = require('nodemailer');
const UserSchema = require('../models/user_model');

// Add
router.post('/addEmail', async(req, res) =>{
        try {
            const { userId, emailId, port } = req.body;

            console.log(emailId);
        
            const user = await UserSchema.findOne({ userId: userId });
        
            if (!user) {
              return res.status(404).json({ error: 'User not found' });
            }
        
            user.emailAccounts.push({emailId : emailId, port: port });
            const updatedUser = await user.save();
        
            return res.status(201).json({ user: updatedUser });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    
});

// Read
router.get('/readEmail', async (req, res) => {
    try {
        const leads = await email_account_model.find();
        res.json(leads);
    } catch (error) {
        res.json({message : error.message});    
    }
});


module.exports = router;