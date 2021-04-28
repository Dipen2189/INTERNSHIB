const companyloginmodel = require('../models/companyloginmodel');
const bcrypt = require('bcrypt');

exports.complogin = function(req, res){
    res.render('complogin', {SuccessMsg: req.flash('Success'), ErrorMsg: req.flash('Error'), title: 'Login'});
 }

exports.company = function(req,res){
    let encrpyt = " "
    const uname = req.body.username
    const password = req.body.password
    console.log(uname);
    console.log(password);

    companyloginmodel.login(uname,function(error,data){
        if(res.error){
            req.flash('Error', 'invalid login or password!!');
            res.redirect('/complogin');
        }
        else{
            console.log('result',data)
            req.session.user=data[0].cmp_id;
            req.session.usertype = 'company';
            const uname = data[0].username;
            const pwd = data[0].password;
            console.log(uname);
            console.log(pwd);
            console.log('session id:',req.session.user);
            console.log('usertype:',req.session.usertype);


            if(req.session.user == data[0].cmp_id){
                bcrypt.compare(password,pwd).then((result=>{
                    console.log('result:',result);
                    if(result){
                        req.flash('Success','User Login Successfully');
                        res.redirect('/company/home/'+ req.session.user);
                    }
                    else{
                        req.flash('Error','invalid password!!')
                        res.redirect('complogin');
                    }
                })).catch((err)=>{
                    console.error(err);
                })
            }
            else{
                req.flash('Error','please login first!!');
                res.redirect('complogin');
            }
        }
            
    })
}