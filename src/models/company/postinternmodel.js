const db = require('../../../config/db_config');

const registerPost = function(fetchData){
    this.cmp_id = fetchData.cmp_id,
    this.title = fetchData.title,
    this.start_date = fetchData.start_date,
    this.last_date = fetchData.last_date,
    this.loc_intern = fetchData.loc_intern,
    this.duration = fetchData.duration,
    this.duration_per = fetchData.duration_per,
    this.stipend = fetchData.stipend,
    this.no_interns = fetchData.no_interns,
    this.part_time = fetchData.part_time,
    this.skills = fetchData.skills,
    this.about = fetchData.about,
    this.apply = fetchData.apply,
    this.perks = fetchData.perks
}

registerPost.enterData = function(data,result){
    console.log('dp', data);
    
    const sql = 'INSERT INTO post_intern SET ?';

    db.query(sql,data,function(err,res){
        if(err){
            console.log("error while entering into data!!");
            result(err,null);
        }
        else{
            console.log(res);
            result(null,res);
        }
    })
}

module.exports = registerPost;