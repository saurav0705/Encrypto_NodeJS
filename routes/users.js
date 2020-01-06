var express = require('express');
var Users = require('../models/users');
const bodyParser = require('body-parser');
var passport = require('passport');
var authenticate = require('../authenticate');


const userRouter = express.Router();
userRouter.use(bodyParser.json());
/* GET users listing. */
userRouter.route('/')
.all((req,res,next)=>{
  res.statusCode = 200;
  res.setHeader('Content-type','application/json');
  next();
})
.get((req,res,next)=>{
  
  res.json({
    'status': 'ok'
  });
})
.post((req,res,next) => {
  Users.create(req.body)
  .then((user)=>{
    res.json({"status":"ok"});
  },(err)=>next(err))
  .catch((err)=>next(err))
});

userRouter.post('/signup',(req,res,next)=>{
  Users.register(new Users({username:req.body.username}) , req.body.password,(err,user)=>{
    if(err){
      res.statusCode = 400;
      res.setHeader('Content-type','application/json');
      res.json({"ERROR":err});
    }
    else{
      user.firstname = req.body.firstname;
      user.lastname = req.body.lastname;
      user.save()
      .then((user)=>{
        passport.authenticate('local')(req,res,()=>{
          res.statusCode = 200;
          res.setHeader('Content-type','application/json');
          res.json({success:true,status: "Registration Succesfull","USER":user});
        });
      },(err)=>next(err))
      .catch((err)=>next(err));
    }
  });
});

userRouter.post('/login',passport.authenticate('local'),(req,res)=>{
  res.statusCode = 200;
  res.setHeader('Content-type','application/json');
  res.json({"status":"login working fine"});
});

module.exports = userRouter;
