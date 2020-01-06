const passport = require('passport');
const LocalStartegy = require('passport-local').Strategy;
const User = require('./models/users');


passport.use(new LocalStartegy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());