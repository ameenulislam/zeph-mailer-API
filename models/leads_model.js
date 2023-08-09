const mongoose =require('mongoose');

const leadsSchema = new mongoose.Schema({
name: {
    type : String,
    required: true,
},
email: {
    type : String,
    required: true,
},
company: {
    type : String,
    required: true,
},
website: {
    type : String,
},
City: {
    type : String,
},
})

module.exports = mongoose.model('leads', leadsSchema);