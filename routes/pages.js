const express = require('express');
const router = express.Router();

// Article Model
//let Article = require('../models/pages');
// User Model
let User = require('../models/user');

router.get('/home',ensureAuthenticated, function(req, res){
      res.render('home');
    });
router.get('/about',ensureAuthenticated, function(req, res){
      res.render('about');
    });
router.get('/dashboard',ensureAuthenticated, function(req, res){
      res.render('dashboard');
    });

router.get('/hard-ware-setup',ensureAuthenticated, function(req, res){
      res.render('hard-ware-setup');
    });

router.get('/anything',ensureAuthenticated, function(req, res){
      res.render('anything');
    });

// Access Control
function ensureAuthenticated(req, res, next){
  if(req.isAuthenticated()){
    return next();
  } else {
    req.flash('danger', 'Please login');
    res.redirect('/users/login');
  }
}

module.exports = router;
