

const postedit = require('../../models/company/posteditmodel');
const moment = require('moment');
const { update } = require('../../models/company/posteditmodel');



exports.postedit = function(req, res) {
    console.log(req.params.p_id);
    const p_id = req.params.p_id;
     postedit.enterData(p_id,function(err,result){         
            res.render('company/postedit', { 
                SuccessMsg: req.flash('Success'), 
                ErrorMsg: req.flash('Error'), 
                title: 'Postedit',
                moment: moment,
                result: result[0]
            });
        }); 
};

exports.postupdate = function(req,res){
    console.log(req.params.p_id);
    const p_id = req.params.p_id;
    console.log(req.body.p_id);
    const result = req.body;
    const loc_intern = JSON.stringify(req.body.loc_intern);
    const skills = JSON.stringify(req.body.skills);
    const perks = JSON.stringify(req.body.perks);
    
    console.log(result);
    if(result!=null){
        const data = result;
        data.loc_intern=loc_intern;
        data.skills=skills;
        data.perks=perks;
       // data.stipend=stipend;
       // data.duration=duration;
        

        postedit.update(p_id,data,function(error,result){
            console.log(result);
            if(result.error){
                req.flash("Error",'Error while updating your Internship!!')
                res.render('/company/postedit');
            }
            else{
                if(result==null){
                    req.flash("Error",'Error while updating your Internship!!')
                    res.redirect('/company/postedit');
                }
                else{
                    req.flash('Success','Successfully updated your Internship!!')
                    res.redirect('/company/internsdetails/'+p_id);
                }
                
            }
        });
    }
}