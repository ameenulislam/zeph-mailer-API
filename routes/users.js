const express = require('express');
const router = express.Router();
const user = require('../models/userModel')

router.get('/', (req, res) =>{
    res.send('hey there !');
})


module.exports = router;