var dbConn = require('../../config/db_config');

var studentUser = function(studuser) {
    this.stud_id = studuser.stud_id,
        this.stud_name = studuser.stud_name,
        this.emailid = studuser.emailid,
        this.username = studuser.username,
        this.password = studuser.password,
        this.clg_name = studuser.clg_name,
        this.semester = studuser.semester,
        this.branch = studuser.branch,
        this.cgpa = studuser.cgpa,
        this.yop = studuser.yop;
    this.resum = studuser.resum;
}

//check existing email
/*studentUser.existemail = (result) =>{
    dbConn.query('Select emailid from student where emailid = ?',emailid,(err,res)=>{
        if(err)
        {
            result(err,null)
        }
        else
        {
            console.log(result)
            result(null,res)
        }
    })
}*/

//add student User
studentUser.newUser = function(data, result) {
    console.log('data in student model:', data);
    dbConn.query('INSERT INTO student SET ?', data, function(err, res) {
        if (err)
            result(err, null);

        else
            console.log(res);
        result(null, res);
    })
}

//student login
studentUser.verifylogin = function(data, result) {
    dbConn.query('Select stud_id,username,password from student where username = ? ', data, function(err, res) {
        console.log('username', data)
        if (err) {
            result(err, null);
        } else {
            console.log(res);
            result(null, res);
        }
    })
}


module.exports = studentUser;