const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const textSchema = new Schema({
    IncomingText:{
        type:String,
        required:true
    },
    PassKey:{
        type:Number,
        required:true,

    },
    OutputText:{
        type:String,
        required:true
    }
},{
    timestamps:true
});

module.exports = mongoose.model('TextModel',textSchema);