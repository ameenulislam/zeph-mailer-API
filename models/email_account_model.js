const mongoose = require('mongoose');

const EmailSchema = new mongoose.Schema({
    accountId : {
        type: String,
    },
    name: {
        type: String, 
        required: true
    },
    email: {
        type: String, 
        required: true
    },
    smtphost: {
        type: String, 
        required: true
    },
    password: {
        type: String, 
        required: true
    },
    port : {
        type: Number,
        required: true
    },
    secure :{
        type : Boolean,
        required : true
    }
    
})

module.exports = mongoose.model('emailUser', EmailSchema);