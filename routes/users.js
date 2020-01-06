var express = require('express');
var Users = require('../models/users');
const bodyParser = require('body-parser');


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

module.exports = userRouter;
