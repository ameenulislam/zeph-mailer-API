const express = require('express');
const userModel = require('../models/user_model')
const router = express.Router();


router.post('/userInfo', async (req, res) => {
    const id = req.body.id;

    const user = await userModel.findOne({userId: id});

    if(user){
        const customResponse = {
            id: user.userId,
            status: true, 
            message : "User fetched",
            details: {
                name : user.name,
                email : user.email
            },
            emailAccounts:[],
            campaigns:[],

        };
        res.json(customResponse);
    }
    else{
        const customResponse = {
            status: false, 
            message : "User not found",
        };

        res.json(customResponse);
    }

  });
  



module.exports = router;