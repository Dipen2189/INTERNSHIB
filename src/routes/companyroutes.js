const express = require('express');
const router = express.Router();
const companyhomecontroller = require('../controllers/company/companyhomecontroller');
const postinternController = require('../controllers/company/postintern.controller');
const appliedstudentController = require('../controllers/company/appliedstudent.controller');
const interndetailscontroller = require('../controllers/company/interndetails.controller');
const posteditcontroller = require('../controllers/company/postedit.controller');
const postdeletecontroller = require('../controllers/company/deletepost.controller');
const companyedit = require('../controllers/company/companyedit.controller');
const complogout = require('../controllers/company/complogout.controller');
const viewstudent = require('../controllers/company/viewstudent.controller');



// home
router.get('/home/:cmp_id', companyhomecontroller.home);


//delete post
router.get('/postdelete/:p_id', postdeletecontroller.postdelete);


//post an internship
router.get('/postintern', postinternController.postintern);
router.post('/postintern', postinternController.post);


//applied student
router.get('/appliedstudent', appliedstudentController.appliedstudent);


//intern details
router.get('/internsdetails/:p_id', interndetailscontroller.details);


//postedit
router.get('/postedit/:p_id', posteditcontroller.postedit);
router.post('/postedit/:p_id', posteditcontroller.postupdate);


//edit
router.get('/compedit', companyedit.compedit);
router.post('/compedit', companyedit.compeditpost);


//view student
router.get('/viewstudent/:apply_id', viewstudent.viewstudent);


//accept or reject in view student
router.post('/viewstudent/:apply_id', viewstudent.viewstudentpost);


//logout
router.get('/complogout', complogout.complogout);


module.exports = router