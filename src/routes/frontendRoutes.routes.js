const express = require('express');
const router = express.Router();
const frontendController =   require('../controllers/frontend.controller');
//const student = require('../controllers/studforgotpass.controller');
//const company = require('../controllers/compforgotpass.controller');
//const otpverify = require('../controllers/otpverify.controller');
//const newpassword = require('../controllers/newpassword.controller');

const companyregister = require('../controllers/companyregister.controller');
const companylogin = require('../controllers/companylogin.controller');
const compforgotpass = require('../controllers/compforgotpass.controller');
const otpverify = require('../controllers/otpverify.controller');
const newpassword = require('../controllers/newpassword.controller');
const student = require('../controllers/studforgotpass.controller');

// about us
router.get('/', frontendController.aboutus);


// about us
router.get('/FAQs', frontendController.faq);


//company register
router.get('/compregister', companyregister.compregister);
router.post('/compregister', companyregister.saveCompany);


//student register
router.get('/studregister', frontendController.studregister);
router.post('/studregister', frontendController.saveStudent);


//company login get
router.get('/complogin', companylogin.complogin);
//company authentication (company login post)
router.post('/complogin', companylogin.company);;


// student login
router.get('/studlogin', frontendController.studlogin);
router.post('/studlogin',frontendController.poststudentlogin);


//student forgot password get
router.get('/studforgotpass',student.studforgotpass);
router.post('/studforgotpass',student.studforgotpasspost);


//company forgot password get
router.get('/compforgotpass',compforgotpass.compforgotpass);
//company forgotpassword post
router.post('/compforgotpass',compforgotpass.compforgotpasspost);


// student otp verification
router.get('/verify',student.verifyotp);
router.post('/verify',student.otpverifypost);


// company otp verification
router.get('/otpverify',otpverify.otpverify);
//company otp verification post
router.post('/otpverify',otpverify.otpverifypost);
//company new password
router.get('/newpassword',newpassword.newpass);
//company new pass word post
router.post('/newpassword',newpassword.newpasspost);


//student new password
router.get('/studnewpassword',student.newpass);
router.post('/studnewpassword',student.newpasspost);



module.exports = router
