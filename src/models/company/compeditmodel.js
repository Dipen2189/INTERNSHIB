const db = require('../../../config/db_config');

const editfetch = function(fetchData){
    this.cmp_id = fetchData.cmp_id,
    this.cmp_name = fetchData.cmp_name,
    this.emailid = fetchData.emailid,
    this.username = fetchData.username,
    this.url = fetchData.url,
    this.city = fetchData.city,
    this.state = fetchData.state,
    this.aboutus = fetchData.aboutus
}

editfetch.enterdata = function(cmp_id,result){
    const sql = 'select * from company where cmp_id = ?';
    db.query(sql,cmp_id,(err,res)=>{
        console.log(res);
        if(err){
            result(err,null);
        }
        else{
            
            result(null,res);
        }
    })
}

editfetch.updatedata = function(cmp_id,data,result){
    console.log('in edit model',cmp_id);
    console.log('in edit model data',data);

    const sql = 'UPDATE company SET ? WHERE cmp_id = ?';
     db.query(sql,[data,cmp_id],function(err,res){
        console.log(res);
        if(err){
            result(err,null);
        }
        else{
            
            result(null,res);
        }
    })
}


module.exports = editfetch;