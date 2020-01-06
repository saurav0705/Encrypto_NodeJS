const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');


const user = new Schema({
    
    firstname:{
        type:String,
    },
    lastname:{
        type:String,
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
user.plugin(passportLocalMongoose);
const User = mongoose.model('User',user);
module.exports = User;