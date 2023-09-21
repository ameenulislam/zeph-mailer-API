const express = require('express');
const router = express.Router();
const nodeMailer = require('nodemailer');
const UserSchema = require('../models/user_model');


let id = 1;
router.post('/addContacts', async (req, res) =>{
    try {
        const {userId, listName, contactList} = req.body;

        const user = await UserSchema.findOne({ userId: userId });
        
        if (!user) {
            const response = {
                status : false,
                message : "User not found"
            }
            return res.status(200).json(response);
        }

        const listExists = user.contactList.some(list => list.listName === listName);

        if(listExists){
            const response = {
                status : false,
                message : "List with the name already exists"
            }
            return res.status(200).json(response);
        }
        else{

            user.contactList.push({
                id: id,
                listName:listName,
                contactList: contactList
            })
            id++;
            user.save();

            const response = {
                status : true,
                message : "Contact list added"
            }
                
            return res.json(response);
        }


    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' }); 
    }
});

router.post('/removeContactList', async(req,res) =>{
    try {
        const {userId, listId} = req.body;
        
        const user = await UserSchema.findOne({userId : userId});

        if(!user){
            const response = {status: false, message: "User not found"};
            return res.json(response);
        }
        
        user.contactList = user.contactList.filter(list => list.id !== listId);
        await user.save();

        const response = {status : true, message :"List removed Successfully"}
        return res.json(response);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;