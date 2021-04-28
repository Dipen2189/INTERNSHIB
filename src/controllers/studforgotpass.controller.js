const forgotpassword = require('../models/studforgotpass.model');
const nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
const bcrypt = require('bcrypt');
const saltRounds = 10;

//forgot password get
exports.studforgotpass = function(req, res) {
    res.render('studforgotpass', { SuccessMsg: req.flash('Success'), ErrorMsg: req.flash('Error'), title: 'Forgot_password' });
};


//forgot password post
exports.studforgotpasspost = function(req, res) {
    const emailid = req.body.emailid;
    console.log('emailid:', emailid);

    //for otp

    var otp = Math.random();
    otp = otp * 1000000;
    otp = parseInt(otp);
    console.log(otp);

    forgotpassword.getdata(emailid, otp, function(err, result) {
        if (result.error) {
            res.redirect('/studforgotpass');
        } else {
            var transporter = nodemailer.createTransport(smtpTransport({
                service: 'gmail',
                host: 'smtp.gmail.com',
                auth: {
                    user: 'dipenprajapati1999@gmail.com',
                    pass: 'dipen1999@@'
                }
            }));

            var mailOptions = {
                from: '',
                to: emailid,
                subject: 'OTP for verification',
                html: "<h3>OTP for student account verification is </h3>" + "<h1 style='font-weight:bold;'>" + otp + "</h1>" // html body
            };

            transporter.sendMail(mailOptions, function(error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Message sent: %s', info.messageId);
                    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
                }
            });

            res.redirect('/verify');
        }
    })
}


//new password get 
exports.newpass = function(req, res) {
    res.render('studnewpassword', { SuccessMsg: req.flash('Success'), ErrorMsg: req.flash('Error'), title: 'newpassword' });
}

//new password post
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

        forgotpassword.newpassword(emailid, newpassword, function(err, result) {
            if (result.error) {
                req.flash("Error", 'Error while updating your new password!!')
                res.redirect('/studforgotpass');
            } else {
                req.flash("Success", 'Successfully updated your paswword!!')
                res.redirect('/studlogin');
            }
        })
    } else {
        res.render('studnewpassword', { title: 'Set_password' })
    }
}


//verify the otp get
exports.verifyotp = function(req, res) {
    res.render('studentverifyotp', { SuccessMsg: req.flash('Success'), ErrorMsg: req.flash('Error'), title: 'verifyotp' });
}

//verify the otp post
exports.otpverifypost = function(req, res) {
    const emailid = req.body.emailid;
    console.log('emailid in verifyotp:', emailid);

    var verifyotp = req.body.otp;
    console.log(verifyotp);

    verifyotp = parseInt(verifyotp);
    console.log('after conv to int', verifyotp);

    forgotpassword.verifyotp(emailid, function(error, result) {
        if (result.error) {
            res.redirect('/studforgotpass');
        } else {
            var a = result[0];
            console.log('checking the result', a);

            b = parseInt(a.otp);
            console.log('after conv to int:', b);

            if (verifyotp == b) {
                res.redirect('/studnewpassword');
            } else {
                res.redirect('/studforgotpass');
            }
        }
    })
}