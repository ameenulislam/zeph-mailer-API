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
    emailAccounts:[{id: Number, emailId : String, port: Number, host : String, emailPassword : String, secure: Boolean}]
    
})

module.exports = mongoose.model('User', UserSchema);