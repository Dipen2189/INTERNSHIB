const db = require('../../config/db_config');

var company = function(fetchData){
    this.cmp_name = fetchData.cmp_name,
    this.emailid = fetchData.emailid,
    this.username = fetchData.username,
    this.password = fetchData.password,
    this.url = fetchData.url,
    this.city = fetchData.city,
    this.state = fetchData.state,
    this.aboutus = fetchData.aboutus
}

company.newcompany = function(data,result){
    console.log(data);
    let sql = 'insert into company set ?';
    db.query(sql,data,function(err,res){
        if(err){
            console.log(err);
            result(err,null);
        }
        else{
            console.log(res);
            result(null,res);
        }
    })
}
module.exports = company;