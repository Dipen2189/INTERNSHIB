const db = require('../../config/db_config');

const forgotpass = function(fetchData){
    this.emailid = fetchData.emailid,
    this.otp = fetchData.otp
}

forgotpass.getdata = function(data,data1,result){
    console.log('in model:',data);
    console.log('in model otp',data1);
    
    const sql = 'UPDATE company SET otp= ? WHERE emailid= ?';
   var dp = db.query(sql,[data1,data], function(err,res){
        
        if(err){
            console.log('cannot get emailid',err)
            result(err,null);
        }
        else{
            console.log(res);
            result(null,res);
        }
    })

    console.log(dp.sql);
}

forgotpass.verifyotp = function(data,result){
    console.log('in verifyotp model:', data);

    const sql = 'select otp from company where emailid = ?';
    var dp = db.query(sql,data,function(err,res){
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

forgotpass.newpassword = function(email,pass,result){
    console.log('in new password emailid is:',email);
    console.log('in new password password is:', pass);

    const sql = 'UPDATE company SET password= ? WHERE emailid= ?';
    var dp = db.query(sql,[pass,email],function(err,res){
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

module.exports = forgotpass;