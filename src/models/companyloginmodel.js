const db = require('../../config/db_config');

var companylogin = function(fetchData){
    this.username = fetchData.username,
    this.password = fetchData.password,
    this.cmp_id = fetchData.cmp_id
}

companylogin.login= function(data,result){
    console.log(data);
    let sql = 'select cmp_id,username,password from company where username = ?';
    db.query(sql,data,(err,res)=>{
        console.log(res.length);
        if(res.length == 0){
           result(err,null); 
        }
        else{
            console.log(res);
            result(null,res);
        }
    })
}

module.exports = companylogin;
