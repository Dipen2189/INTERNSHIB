//registration
//var companyUsers = require('../models/company.model');
var studentUsers = require('../models/student.model');

//for password hashing
const bcrypt = require('bcrypt');
const saltRounds = 10;
const studentloginmodel = require('../models/student.model');
//const companyloginmodel = require('../models/company.model');
const fs = require('fs');
const path = require('path');
const dirPath = path.join(__dirname, '\\pdf');

//fs.mkdirSync(dirPath);
//express.static(path.join(__dirname, '/public'));


//initial page 
exports.aboutus = function(req, res) {
    res.render('aboutus', { SuccessMsg: req.flash('Success'), ErrorMsg: req.flash('Error'), title: 'About us' });
};

//FAQs
exports.faq = function(req, res) {
    res.render('faq', { title: 'FAQs' });
}

//company registration get
exports.compregister = function(req, res) {
    res.render('compregister', { SuccessMsg: req.flash('Success'), ErrorMsg: req.flash('Error'), title: 'compregister' });
}

//company registration post
exports.saveCompany = async function(req, res) {
    const password = req.body.password;
    try {
        if (password != null) {
            hash = await bcrypt.hash(password, saltRounds);
            console.log(hash)


            const check = new companyUsers(req.body); //object created for avoiding req.body.password
            check.password = hash;

            console.log(check);

            companyUsers.compUser(check, function(error, result) {
                console.log(result)
                if (result.error) {
                    res.redirect("/compregister");
                    req.flash(result.error.toString());
                } else {
                    const uname = req.body.username;
                    req.flash("Success", `welcome ${uname} to INTERNS-HUB! Please enter your details to continue`);
                    res.redirect("/complogin");
                }
            })
        } else {
            req.flash("Error", 'error occur plzz eneter right crenditals!!');
            res.redirect("/compregister");
        }
    } catch (error) {
        console.log(error);
    }
}


//student registration post
//student registration get
exports.studregister = function(req, res) {
    //console.log('welcome to student register get!!');
    res.render('studregister', { SuccessMsg: req.flash('Success'), ErrorMsg: req.flash('Error'), title: 'studregister' });
}

//student registration post
exports.saveStudent = async function(req, res) {
    //console.log('welcome to student register post');
    const password = req.body.password;
    //console.log('data in student register post:', req.body);
    if (req.body == null) {
        req.flash("Error", 'error occur plzz try again');
        res.redirect('/studregister');
    } else {
        try {
            if (password != null) {
                hash = await bcrypt.hash(password, 5);
                console.log(hash)
                    //fileupload
                let sampleFile;
                let uploadPath;

                //console.log(sampleFile + uploadPath);

                // if (!req.files || Object.keys(req.files).length === 0) {
                //    return res.status(400).send('No files were uploaded.');
                //}

                // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
                console.log(dirPath);
                sampleFile = req.files.resum;
                uploadPath = './/public//pdf//' + sampleFile.name;

                sampleFile.mv(uploadPath, function(err) {
                    if (err) {
                        req.flash("Error", 'Error while uploading your pdf');
                        res.redirect('/studregister');
                    }

                });
                console.log(sampleFile);
                console.log(uploadPath);

                const check = new studentUsers(req.body); //object created for avoiding req.body.password
                check.password = hash;
                check.resum = uploadPath;
                console.log(check);

                studentUsers.newUser(check, function(error, result) {
                    console.log(result)
                    if (result.error) {
                        req.flash("Error", 'error occur while registering!!');
                        res.redirect("/studregister");

                    } else {
                        const uname = req.body.username;
                        req.flash("Success", `welcome ${uname} to INTERNS-HUB! Please enter your details to continue`);
                        res.redirect("/studlogin");
                    }

                })
            } else {
                req.flash("Error", 'error while fetching data from frontend!1');
                res.redirect("/studregister");
            }
        } catch (error) {
            console.log(error);
            req.flash("Error", 'error occur plzz eneter right crenditals!!');
            res.redirect("/studregister");
        }
    }
}



//company login get
exports.complogin = function(req, res) {
    res.render('complogin', { SuccessMsg: req.flash('Success'), ErrorMsg: req.flash('Error'), title: 'Login' });
};

//company login post
exports.postcompanylogin = async function(req, res) {
    const uname = req.body.username // from form
    const password = req.body.password

    companyloginmodel.login(uname, function(error, data) {
        if (res.error) {
            req.flash('Error', 'invalid login or password!!');
            res.redirect('/complogin');
        } else {
            console.log('result', data)
            req.session.user = data[0].cmp_id;
            req.session.isLoggedIn = true;
            req.session.usertype1 = 'company';
            const uname = data[0].username;
            const pwd = data[0].password;
            console.log('usertype', req.session.usertype1);


            if (req.session.user == data[0].cmp_id) {
                bcrypt.compare(password, pwd).then((result => {
                    console.log('result:', result);
                    if (result) {
                        req.flash('Success', 'Welcome to Interns-Hub!!');
                        res.redirect('/company/home/' + req.session.user);
                    } else {
                        req.flash('Error', 'Passwords do not Match')
                        res.redirect('/complogin');
                    }
                })).catch((err) => {
                    console.error(err);
                })
            } else {
                req.flash('Error', 'Please login first!!');
                res.redirect('/complogin');
            }
        }

    })
}

//student login get 
exports.studlogin = function(req, res) {
    res.render('studlogin', { SuccessMsg: req.flash('Success'), ErrorMsg: req.flash('Error'), title: 'Login' });
};

//student login post
exports.poststudentlogin = async function(req, res) {
    const uname = req.body.username // from form
    const password = req.body.password

    studentloginmodel.verifylogin(uname, function(error, data) {
        if (res.error) {
            req.flash('Error', 'invalid login or password!!');
            res.redirect('/studlogin');
        } else {
            console.log('result', data)
            req.session.user = data[0].stud_id;
            req.session.isLoggedIn = true;
            req.session.usertype2 = 'student';
            const uname = data[0].username;
            const pwd = data[0].password;
            console.log('usertype', req.session.usertype2);

            if (req.session.user == data[0].stud_id) {
                bcrypt.compare(password, pwd).then((result => {
                    console.log('result:', result);
                    if (result) {
                        req.flash('Success', 'Welcome to Interns-Hub!!');
                        res.redirect('/student/studhome');
                    } else {
                        req.flash('Error', 'Passwords do not Match')
                        res.redirect('/studlogin');
                    }
                })).catch((err) => {
                    console.error(err);
                })
            } else {
                req.flash('Error', 'Please login first!!');
                res.redirect('/studlogin');
            }
        }
    })
}