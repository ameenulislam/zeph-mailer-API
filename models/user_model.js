const mongoose = require('mongoose')


const UserSchema = new mongoose.Schema({
    userId:{
        type : Number
    },
    email :{
        type : String,
        required : true
    },
    userName :{
        type : String,
    },
    campaigns:{
        type : Array,
    },
    Accounts:{
        type : Array,
    } 
})

module.exports = mongoose.model('User', UserSchema);