const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    email : {
        type : String,
        required : true,
        max : 20,
        unique : true
    },
    password : {
        type : String,
        min : 6,
        required : true 
    },
    username : {
        type : String,
        min : 3,
        max : 20,
        required : true 
    },
    token : {
        type : String,
        default : ""
    }
},
{
    timestamps : true 
})

module.exports = mongoose.model('User' , userSchema);