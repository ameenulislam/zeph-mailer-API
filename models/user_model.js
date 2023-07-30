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
        
    }
})

module.exports = mongoose.model('user', UserSchema);