const registercompany = require('../models/companyregistermodel');
const bcrypt = require('bcrypt');
const saltRounds = 10;


exports.compregister = function(req, res) {
    res.render('compregister', { SuccessMsg: req.flash('Success'), ErrorMsg: req.flash('Error'), title: 'compregister' });
}

exports.saveCompany = async function(req, res) {
    value = req.body;

    if (value != null) {
        const encryptedPassword = await bcrypt.hash(req.body.password, saltRounds);
        req.body.password = encryptedPassword;
        const data = new registercompany(value);
        data.password = encryptedPassword;
        console.log(value);
        registercompany.newcompany(data, function(err, result) {
            console.log(result);
            if (result.error) {
                req.flash('Error', 'Something went wrong while adding user!');
                res.redirect('/compregister');
            } else {
                req.flash('Success', 'User added successfully!');
                res.redirect('/complogin');
            }
        });
    }
}