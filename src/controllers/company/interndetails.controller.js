const postintern = require('../../models/company/interndetailmodel');
const moment = require('moment');

/*exports.interndetails = function(req,res){
    res.render('internsdetails');
}*/
exports.details = function(req,res){

    console.log(req.params.p_id);
    const p_id = req.params.p_id;
    postintern.enterData(p_id,function(err,result){
        
        if(result.error){
            req.flash("Error",'Error while displaying Interhship Details');
            res.render('/company/home/'+req.session.user);
        }
        else{
            res.render('company/internsdetails', { 
                SuccessMsg: req.flash('Success'), 
                ErrorMsg: req.flash('Error'), 
                title: 'internsdetails',
                moment: moment,
                result: result[0]
            });
        }
        
    }); 
}
