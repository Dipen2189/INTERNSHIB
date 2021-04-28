const db = require('../../../config/db_config');

deletepost = function(fetchData){
    this.p_id = fetchData.p_id
}

deletepost.deleteintern= function(p_id,result){
    console.log('check pid in model',p_id);

    let sql = 'delete from post_intern where p_id = ?';
    db.query(sql,p_id,function(err,res){
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

module.exports = deletepost;