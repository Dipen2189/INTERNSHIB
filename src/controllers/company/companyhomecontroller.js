const postintern = require('../../models/company/internmodel');
const moment = require('moment');

exports.home = function(req, res) {

    if (req.session.user) {
        cmp_id = req.params.cmp_id;
        console.log(cmp_id);
        postintern.enterData(cmp_id, function(err, result) {
            res.render('company/home', {
                SuccessMsg: req.flash('Success'),
                ErrorMsg: req.flash('Error'),
                title: 'Home',
                usertype1: 'company',
                moment: moment,
                result: result
            });
        });
    }
}