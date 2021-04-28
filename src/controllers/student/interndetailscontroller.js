var studhome = require('../../models/interndetails.model')
const moment = require('moment');

exports.companydetails = function(req, res) {
    studhome.view(req.params.p_id, function(err, result) {
        console.log(result)
        if (err) {
            console.log("Error");
        } else {
            res.render('student/interndetails', { SuccessMsg: req.flash('Success'), ErrorMsg: req.flash('Error'), title: 'interndetails', moment: moment, result: result[0] });
        }
    })
}

exports.apply = function(req, res) {
    const a = req.body;
    console.log('applying:', a)
    studhome.apply(a, function(err, result) {
        if (err) {
            console.log("Error")
        } else {
            req.flash('Success', 'Applied!')
            res.redirect('/student/interndetails/' + req.params.p_id);
        }
    })
}