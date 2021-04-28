const db = require('../../../config/db_config');
//const  studentdetail  = require('../controllers/studentdetailcontroller');

const postfetch = function(fetchData){
    this.p_id = fetchData.p_id,
    this.cmp_id = fetchData.cmp_id,
    this.title = fetchData.title,
    this.cmp_name = fetchData.cmp_name,
    this.city = fetchData.city,
    this.start_date = fetchData.start_date,
    this.duration = fetchData.duration,
    this.duration_per = fetchData.duration_per,
    this.stipend = fetchData.stipend,
    this.last_date = fetchData.last_date,
    this.loc_itern = fetchData.loc_intern,
    this.no_interns = fetchData.no_interns,
    this.part_time = fetchData.part_time,
    this.skills = fetchData.skills,
    this.about = fetchData.about,
    this.apply = fetchData.apply,
    this.perks = fetchData.perks,
    this.curr_date = fetchData.curr_date
}

postfetch.enterData = function(p_id,result){
    console.log(p_id);

    let sql = 'select c.cmp_name,c.city,p.* from company c,post_intern p where p.cmp_id=c.cmp_id && p_id=?';
   
    db.query(sql,p_id,(err,res)=>{
        console.log(res);
        if(res.length== 0){
            result(err,null);
        }
        else{
            
            result(null,res);
        }
    })
}

module.exports = postfetch;