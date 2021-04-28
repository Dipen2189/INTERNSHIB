const db = require('../../../config/db_config');

const postfetch = function(fetchData){
    this.apply_id = postfetch.apply_id,
    this.cmp_id = postfetch.cmp_id,
    this.stud_id = postfetch.stud_id,
    this.stud_name = postfetch.stud_name,
    this.emailid = postfetch.emailid,
    this.username = postfetch.username,
    this.clg_name = postfetch.clg_name,
    this.semester = postfetch.semester,
    this.branch = postfetch.branch,
    this.cgpa = postfetch.cgpa,
    this.yop = postfetch.yop,
    this.resume = postfetch.resume
}

postfetch.fetchData = function(apply_id,result){
    console.log('apply id in view student model:',apply_id);

    const sql = 'select s.* from student s, apply a where a.stud_id = s.stud_id && apply_id = ?';
    db.query(sql,apply_id,(err,res)=>{
        if(err){
            console.log(err);
            result(err,null);
        }
        else{
            console.log('in model result is:',res);
            result(null,res);
        }
    })
}

postfetch.statusupdate = function(data,id,result){
    console.log('value of status in model:',data);
    console.log('apply id in view student model is:',id);

    const sql = 'UPDATE apply set ? where apply_id = ?';
    db.query(sql,[data,id],(err,res)=>{
        if(err){
            console.log('error while updating into database:',err);
            result(err,null);
        }
        else{
            console.log(res);
            result(null,res);
        }
    })
}

module.exports = postfetch;