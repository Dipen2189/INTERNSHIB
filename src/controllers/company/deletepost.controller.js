const deletepost = require('../../models/company/deletepostmodel');

exports.postdelete = function(req,res){
    const p_id = req.params.p_id;
    console.log(p_id);

    deletepost.deleteintern(p_id,function(error,result){
        if(result.error){
            req.flash("Error",'Error while deleting your Internship!!');
            res.redirect('/company/home/'+ req.session.user);
        }
        else{
            console.log(result);
            req.flash('Success','Successfully Deleted Internship');
            res.redirect('/company/home/'+ req.session.user);
        }
    })
}