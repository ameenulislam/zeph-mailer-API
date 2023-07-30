const express = require('express');
const router = express.Router();
const UserSchema = require('../models/user_model');

let userId = 0;
let status = false;
let message = '';

router.post('/signUp', async (req, res) => {  
    const user = new UserSchema({
        email: req.body.email,
        userName : req.body.userName
    });

    try {
        const existingUser = await UserSchema.findOne({ email: req.body.email });
        
        //account already present
        if (existingUser) {
            status = true;
            message = 'Successfully Logged in';
    
            const customResponse = {
                id: user.userId,
                status: status, 
                message : message,
                newAccount : false,
                details: {
                    name : user.name,
                    email : user.email
                },
            };
            res.json(customResponse);
        } else {
            //account not present in the db
                    userId++; 
                    user.userId = userId; 
                    status = true;
                    message = 'Signed in as ' + user.email;
                    
                    await user.save();
    
                    const customResponse = {
                        id: user.userId,
                        status: status, 
                        message : message,
                        newAccount : true,
                        details: {
                            name : user.name,
                            email : user.email
                        },
                    };
                    res.json(customResponse);
                    
            console.log('User created');
        }
    
        
    
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.patch('/updateName', async (req, res) => {
    try {
        const updatedUser = await UserSchema.findOneAndUpdate({email: req.body.email}, {userName :  req.body.userName}, {new: true});
        
        
        if (updatedUser) {
            const customResponse = {
                id: updatedUser.userId,
                status: true, 
                message : 'Signed in as ' + updatedUser.email,
                newAccount : false,
                details: {
                    name : updatedUser.userName,
                    email : updatedUser.email
                },
            }; 
            res.send(customResponse);
          } else {
            const customResponse = {
                id: updatedUser.userId,
                status: false, 
                message : 'User not found',
                newAccount : true,
                details: {
                    name : updatedUser.userName,
                    email : updatedUser.email
                },
            }; 
            res.send(customResponse);
          }
    } catch (error) {
        res.status(400).json({ message: error.message }); 
    }
});



module.exports = router;