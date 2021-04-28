const appliedstudent = require('../../models/company/appliedstudent.model');
const moment = require('moment');

exports.appliedstudent = function(req, res) {
    const cmp_id = req.session.user;

    appliedstudent.enterData(cmp_id, function(err, result) {
            if (result.error || result == null) {
                // console.log(error);
                req.flash("Error", 'Error while fetching student detail!! Please Retry');
                res.redirect('company/appliedstudent');
            } else {
                console.log('after fetching data in controller:', result);
                const date = result[0].curr_time;
                //console.log('current date in controller:', date);

                appliedstudent.changestatus(cmp_id, function(err, result1) {
                    if (result1.error) {
                        req.flash("Error", 'Error while update status');
                        res.redirect('company/appliedstudent');
                    } else {
                        res.render('company/appliedstudent', {
                            SuccessMsg: req.flash('Success'),
                            ErrorMsg: req.flash('Error'),
                            title: 'Students Applied',
                            usertype1: 'company',
                            moment: moment,
                            result: result
                        });
                    }
                })

            }
        })
        // res.render('company/appliedstudent', { SuccessMsg: req.flash('Success'), ErrorMsg: req.flash('Error'), title: 'company' });
};