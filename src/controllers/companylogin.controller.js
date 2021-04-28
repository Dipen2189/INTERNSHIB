const companyloginmodel = require('../models/companyloginmodel');
const bcrypt = require('bcrypt');

exports.complogin = function(req, res) {
    res.render('complogin', { SuccessMsg: req.flash('Success'), ErrorMsg: req.flash('Error'), title: 'Login' });
}

exports.company = function(req, res) {
    let encrpyt = " "
    const uname = req.body.username
    const password = req.body.password
    console.log(uname);
    console.log(password);
    if (req.body == null) {
        req.flash("Error", 'Please enter Username and Password!!');
        res.redirect('/complogin')
    }

    companyloginmodel.login(uname, function(error, data) {
        if (data == null) {
            req.flash('Error', 'Invalid Username or Password!!');
            res.redirect('/complogin');
        } else {
            console.log('result', data)
            req.session.user = data[0].cmp_id;
            req.session.usertype1 = 'company';
            const uname = data[0].username;
            const pwd = data[0].password;
            console.log(uname);
            console.log(pwd);
            console.log('session id:', req.session.user);
            console.log('usertype:', req.session.usertype1);


            if (req.session.user == data[0].cmp_id) {
                bcrypt.compare(password, pwd).then((result => {
                    console.log('result:', result);
                    if (result) {
                        req.flash('Success', `Welcome ${data[0].username}!!`);
                        res.redirect('/company/home/' + req.session.user);
                    } else {
                        req.flash('Error', 'Invalid Password!!')
                        res.redirect('complogin');
                    }
                })).catch((err) => {
                    //console.error(err);
                    req.flash('Error', 'Invalid Password!!')
                    res.redirect('complogin');
                })
            } else {
                req.flash('Error', 'Please Login First!!');
                res.redirect('complogin');
            }
        }

    })
}