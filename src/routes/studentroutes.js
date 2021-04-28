const express = require('express');
const router = express.Router();
const studhome = require('../controllers/student/studhomecontroller');
const details = require('../controllers/student/interndetailscontroller');
const studapplied = require('../controllers/student/appliedcontroller');
const locationsearch = require('../controllers/student/mapcontroller');
const freelancer = require('../controllers/student/freelancecontroller');
const studedit = require('../controllers/student/studeditcontroller');
const logoutcontroller = require('../controllers/student/logoutcontroller')


// home is just for url
router.get('/studhome', studhome.studhome);
router.get('/interndetails/:p_id', details.companydetails);
router.post('/apply/:p_id', details.apply);

//for applied companies
router.get('/Applied_Companies', studapplied.appliedinterns);

//map
router.get('/location', locationsearch.getlocation);
//router.post('/location',locationsearch.locationSearch);

//freelancing
router.get('/freelance', freelancer.freelance);

//edit
router.get('/studedit/:id', studedit.show);
router.post('/studedit/:id', studedit.change);
//for resume
router.get('/download/:id', studedit.download);

//for logout
router.get('/logout', logoutcontroller.logout);

module.exports = router;