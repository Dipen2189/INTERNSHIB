const editmodel = require('../../models/company/compeditmodel');

exports.compedit = function(req, res){
    const cmp_id = req.session.user;
    console.log('cmp_id in eidt company:',cmp_id);

    editmodel.enterdata(cmp_id,function(err,result){
        console.log('in controller after fetch',result);
        res.render('company/compedit', { 
            SuccessMsg: req.flash('Success'), 
            ErrorMsg: req.flash('Error'), 
            title: 'compedit',
            usertype1:'company',
            result: result[0]
        });
    })
 }

 exports.compeditpost = function(req,res){
    const cmp_id = req.session.user;
    console.log('cmp_id in eidt company:',cmp_id);
    const result = req.body;
    console.log('result after edit company profile', result);

    if(result!=null){
        const data = result;
        editmodel.updatedata(cmp_id,data,(err,result)=>{
            if(result.error){
                req.flash("Error",'Error while edit your Profile!! Please Try Again!');
                res.redirect('/company/compedit');
            }
            else{
                if(result==null){
                    req.flash("Error",'Error while edit your Profile!! Please Try Again!');
                    res.redirect('/company/compedit');
                }
                else{
                    req.flash("Success",'Successfully Edited your Profile!!')
                    res.redirect('/company/home/'+cmp_id);
                }
            }
        })
    }
 }