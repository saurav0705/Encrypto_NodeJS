const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const user = new Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    encryptedText : [ {
        type : mongoose.Schema.Types.ObjectId,
       ref :'TextSchema'
    } ],
    decryptedText : [ {
        type : mongoose.Schema.Types.ObjectId,
       ref :'TextSchema'
    } ],

},{
    timestamps:true
});
const User = mongoose.model('User',user);
module.exports = User;