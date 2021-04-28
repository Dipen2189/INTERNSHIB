const db = require('../../config/db_config');

const forgotpassword = function(fetchData){
    this.emailid = fetchData.emailid,
    this.otp = fetchData.otp
}

forgotpassword.getdata = function(data,data1,result){
    console.log('in model:',data);
    console.log('in model otp',data1);
    
    db.query('UPDATE student SET otp= ? WHERE emailid= ?',[data1,data], function(err,res){
        
        if(err)
        {
            console.log('cannot get emailid',err)
            result(err,null);
        }
        else
        {
            console.log(res);
            result(null,res);
        }
    })
}

forgotpassword.verifyotp = function(data,result){
    console.log('in verifyotp model:', data);

    db.query('select otp from student where emailid = ?',data,function(err,res){
        if(err){
            console.log('cannot get email',err);
            result(err,null);
        }
        else{
            console.log('result',res);
            result(null,res);
        }
    })
}

forgotpassword.newpassword = function(email,pass,result){
    console.log('in new password emailid is:',email);
    console.log('in new password password is:', pass);

    db.query('UPDATE student SET password= ? WHERE emailid= ?',[pass,email],function(err,res){
        if(err){
            console.log('cannot get email',err);
            result(err,null);
        }
        else{
            console.log('result',res);
            result(null,res);
        }
    })
}

module.exports = forgotpassword;