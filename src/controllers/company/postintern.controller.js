const registerPost = require('../../models/company/postinternmodel');

exports.postintern = function(req, res) {
    res.render('company/postintern', { SuccessMsg: req.flash('Success'), ErrorMsg: req.flash('Error'), title: 'Post Internship', usertype1:'company' });
};

exports.post = function(req, res) {
    const value = req.body;
    
    const loc_intern = JSON.stringify(req.body.loc_intern);
    const skills = JSON.stringify(req.body.skills);
    const perks = JSON.stringify(req.body.perks);
    const cmp_id = req.session.user;
    console.log(cmp_id);
    
    //const stipend = JSON.stringify(req.body.stipend);
    //const duration = JSON.stringify(req.body.duration);

    console.log(value);
    if(value!=null){
        const data = new registerPost(value);
        data.loc_intern=loc_intern;
        data.skills=skills;
        data.perks=perks;
        data.cmp_id=cmp_id;
       // data.stipend=stipend;
       // data.duration=duration;
        console.log(data);

        registerPost.enterData(data,function(error,result){
            console.log(result);
            if(result.error){
                req.flash("Error",'Error while posting Internship!! Please Retry');
                res.redirect('company/postintern');
            }
            else{
                if(result==null){
                    req.flash("Error",'Error while posting Intermship!! Please Retry');
                    res.redirect('company/postintern');
                }
                else{
                    req.flash("Success",'You have successfully posted Internship!!');
                    res.redirect('/company/home/'+req.session.user);
                }        
            }
        })
    }
};