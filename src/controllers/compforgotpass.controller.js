const forgotpass = require('../models/compforgotpassmodel');
const nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');




exports.compforgotpass = function(req, res) {
    res.render('compforgotpass', { SuccessMsg: req.flash('Success'), ErrorMsg: req.flash('Error'), title: 'Forgot_password' });
};

exports.compforgotpasspost = function(req, res) {

    const emailid = req.body.emailid;
    console.log('emailid:', emailid);

    //for otp

    var otp = Math.random();
    otp = otp * 1000000;
    otp = parseInt(otp);
    console.log(otp);

    forgotpass.getdata(emailid, otp, function(err, result) {
        if (result.error) {
            res.redirect('/compforgotpass');
        } else {
            // console.log('getting data from database:', result[0]);

            var transporter = nodemailer.createTransport(smtpTransport({
                service: 'gmail',
                host: 'smtp.gmail.com',
                auth: {
                    user: 'dipenprajapati1999@gmail.com',
                    pass: 'dipen1999@@'
                }
            }));

            var mailOptions = {
                from: 'dipenprajapati1999@gmail.com',
                to: emailid,
                subject: 'OTP for verification',
                html: "<h3>OTP for company account verification is </h3>" + "<h1 style='font-weight:bold;'>" + otp + "</h1>" // html body
            };

            transporter.sendMail(mailOptions, function(error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Message sent: %s', info.messageId);
                    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
                }
            });

            res.redirect('/otpverify');
        }
    })
}