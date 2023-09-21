const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const UserSchema = require('../models/user_model');

let userId = 1;
// USER SIGN UP ROUTE ==================================================>
router.post('/signUp', async (req, res) => {  
    try {
        const existingUser = await UserSchema.findOne({email: req.body.email});
        if(existingUser){
            const customResponse ={
                status: false,
                message : "User already exists",
            }

            res.send(customResponse);
        }
        else{
            const passwordHash = await bcrypt.hash(req.body.password, 10);
            const user = new UserSchema({
                userName: req.body.userName, 
                email: req.body.email, 
                password: passwordHash,
            });

            user.userId = userId;
            userId ++;

            await user.save();

            const successResponse = {
                id: userId,
                status : true,
                message: "Signup successful",
            }

            res.send(successResponse);
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'something went wrong' });
    }

});

// USER LOGIN ROUTE =================================================>
router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await UserSchema.findOne({ email });
      if (!user) {
        return res.status(401).json({ error: 'user not found' });
      }


      const passwordMatch = await bcrypt.compare(req.body.password, user.password);
      if (!passwordMatch) {
        const customResponse = {
            status : false,
            message : "Invalid email or password"
        }
        return res.json(customResponse);
      }
      const customResponse = {
        id: user.userId,
        status : true,
        message : "Login successful"
    }
      res.status(200).json(customResponse);
    } catch (error) {
        console.log(error);
      res.status(500).json({ error: 'An error occurred' });
    }
  });

// GET USER INFO ===============================================>
router.post('/userInfo', async (req, res) => {
    const id = req.body.id;

    const user = await UserSchema.findOne({userId: id});

    if(user){
        const customResponse = {
            id: user.userId,
            status: true, 
            message : "User fetched",
            details: {
                name : user.userName,
                email : user.email
            },
            emailAccounts:user.emailAccounts,
            contactList:user.contactList
            

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