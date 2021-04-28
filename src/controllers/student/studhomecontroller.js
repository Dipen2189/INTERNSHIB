var studhome = require('../../models/studhome.model')
const moment = require('moment');

exports.studhome = function(req, res)
{
    studhome.show(function(err,result)
    {
        res.render('student/studhome', {SuccessMsg: req.flash('Success'), ErrorMsg: req.flash('Error'),
            title: 'Home', moment: moment, result});
    }); 
};