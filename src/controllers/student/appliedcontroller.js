var appliedmodel = require('../../models/applied.model')

exports.appliedinterns = function(req,res) {
  console.log('req', req.session.user);
  appliedmodel.display_internship(req.session.user,function(err,result){
    if(err)
    {
      throw(err)
    }
    else
    {
      res.render('student/appliedintern',{SuccessMsg: req.flash('Success'), ErrorMsg: req.flash('Error'), title: 'Applied', result:result});
    }
  })
}