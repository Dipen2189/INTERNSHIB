const viewstudentdetail = require('../../models/company/viewstudentmodel');
var fs = require('fs');
//var path = require('path');
//var url = require('url');
//var querystring = require('querystring');
//var readBlob = require('read-blob');

exports.viewstudent = function(req, res) {
    const cmp_id = req.session.user;
    console.log('in view student detail:', cmp_id);

    const apply_id = req.params.apply_id;
    console.log('in view student apply_id is:', apply_id);

    viewstudentdetail.fetchData(apply_id, function(error, result) {
        if (result.error) {
            req.flash("Error", 'Error while Displaying Student Details!!');
            res.redirect('company/appliedstudent');
        } else {
            console.log('result in controller:', result);
            res.render('company/viewstudent', {
                SuccessMsg: req.flash('Success'),
                ErrorMsg: req.flash('Error'),
                title: 'view student',
                usertype: 'company',
                result: result[0],
                // result1:result1
            });
        }
    })
}

exports.viewstudentpost = function(req, res) {

    const cmp_id = req.session.user;
    console.log('in view student post detail:', cmp_id);

    //const stud_id = req.params.stud_id;
    //console.log('in view student post stud_id is:',stud_id);

    const apply_id = req.params.apply_id;
    console.log('in view student apply id is:', apply_id);

    const value = req.body;
    console.log('value of aceept/reject/pending:', value);

    viewstudentdetail.statusupdate(value, apply_id, function(error, result) {
        if (result.error) {
            req.flash("Error", 'Error while updating Status!!')
            res.redirect('company/viewstudent');
        } else {
            req.flash("Success", 'Successfully updated Status!!')
            console.log('result in controller:', result);
            res.redirect('/company/appliedstudent');
        }
    })
}
