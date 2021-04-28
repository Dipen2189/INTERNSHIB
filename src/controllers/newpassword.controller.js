const forgotpass = require('../models/compforgotpassmodel');
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.newpass = function(req, res) {
    res.render('newpassword', { SuccessMsg: req.flash('Success'), ErrorMsg: req.flash('Error'), title: 'newpassword' });
}

exports.newpasspost = async function(req, res) {
    var newpassword = req.body.newpassword;
    var confirm = req.body.confirmpassword;
    var emailid = req.body.emailid;
    console.log('new password is:', newpassword);
    console.log('confirm:', confirm);
    console.log('emailid:', emailid);

    if (newpassword == confirm) {
        const encryptedPassword = await bcrypt.hash(newpassword, saltRounds);
        newpassword = encryptedPassword;
        console.log('encrypted password is:', newpassword);

        forgotpass.newpassword(emailid, newpassword, function(err, result) {
            if (result.error) {
                req.flash("Error", 'Error while updating your Password!!');
                res.redirect('/compforgotpass');
            } else {
                req.flash("Success", 'Your Password changed Successfully!!');
                res.redirect('/complogin');
            }
        })

    } else {
        res.render('newpassword', { SuccessMsg: req.flash('Success'), ErrorMsg: req.flash('Error'), title: 'newpassword' })
    }
}