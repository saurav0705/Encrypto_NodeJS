var express = require('express');
var Texts = require('../models/text');
var Users = require('../models/users');
const bodyParser = require('body-parser');
var passport = require('passport');
var authenticate = require('../authenticate');

const textRouter = express.Router();
textRouter.use(bodyParser.json());

textRouter.route('/')
.all((req,res,next)=>{
    res.statusCode = 200;
    res.setHeader('Content-type','application/json');
    next();
})
.get((req,res,next)=>{
    Users.findOne({"_id":"5e14cc668c03eb4660cfc411"})
    .populate('encryptedText decryptedText')
    .then((user)=>{
        res.json({"ENCRYPTED":user.encryptedText,"DECRYPTED":user.decryptedText});
    })
})


module.exports = textRouter;