var express = require('express');
var Texts = require('../models/text');
var Users = require('../models/users');
const bodyParser = require('body-parser');
var passport = require('passport');
var authenticate = require('../authenticate');
var algo = require('../encrpy_decrypt');

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
});

textRouter.route('/encrypt')
.post((req,res,next)=>{
    Users.findOne({"_id":"5e14cc668c03eb4660cfc411"})
    .then((user)=>{
        const text_obj =  algo.Encrypt(req.body.text);
        Texts.create(text_obj)
        .then((text)=>{
            user.encryptedText.push(text._id);
            user.save()
            .then((user)=>{
                res.json({"status":"successfully added","ENCRYPTED":user.encryptedText});
            })
        })    
    },(err)=>next(err))
    .catch((err)=>next(err));
});

textRouter.route('/decrypt')
.post((req,res,next)=>{
    Users.findOne({"_id":"5e14cc668c03eb4660cfc411"})
    .then((user)=>{
        const text_obj =  algo.Decrypt(req.body.text,req.body.pin);
        Texts.create(text_obj)
        .then((text)=>{
            user.decryptedText.push(text._id);
            user.save()
            .then((user)=>{
                res.json({"status":"successfully added","DECRYPTED":user.decryptedText});
            })
        })    
    },(err)=>next(err))
    .catch((err)=>next(err));
});

module.exports = textRouter;
