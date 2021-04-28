var path = require('path');
//var Users = require('../models/users.model');
const bcrypt = require('bcrypt');
//const User = require('../models/users.model');
const saltRounds = 10;

var name = 'hello';
exports.notification = function(req, res) {
    res.render('notification', { SuccessMsg: req.flash('Success'), ErrorMsg: req.flash('Error'), title: 'company' });
};