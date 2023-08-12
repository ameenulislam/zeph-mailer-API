const mongoose = require('mongoose')


const UserSchema = new mongoose.Schema({
    userId:Number,
    email :{
        type : String,
        required : true
    },
    userName :{
        type : String,
    },
    password : {
        type: String,
    },
    emailAccounts:[{emailId : String, port: Number}]
    
     
})

module.exports = mongoose.model('User', UserSchema);