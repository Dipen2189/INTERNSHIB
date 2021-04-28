const forgotpass = require('../models/compforgotpassmodel');

exports.otpverify = function(req,res){
    res.render('otpverify', {SuccessMsg: req.flash('Success'), ErrorMsg: req.flash('Error'), title: 'otpverify'});
  }
  
exports.otpverifypost = function(req,res){
    const emailid = req.body.emailid;
    console.log('emailid in verifyotp:',emailid);
  
    var verifyotp = req.body.otp;
    console.log(verifyotp);
  
    verifyotp = parseInt(verifyotp);
    console.log('after conv to int',verifyotp);

    forgotpass.verifyotp(emailid,function(error,result){
      if(result.error){
        res.redirect('/compforgotpass');
      }
      else{
        var a = result[0];
        console.log('checking the result',a);

        b = parseInt(a.otp);
        console.log('after conv to int:',b);

        if(verifyotp == b){
          res.redirect('/newpassword');
        }
        else{
          res.redirect('/compforgotpass');
        }
      }
    })
  }