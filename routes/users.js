const express = require('express');
const router = express.Router();
const user = require('../models/email_account_model')

router.get('/', (req, res) =>{
    res.send('hey there !');
})


module.exports = router;