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

postfetch.enterData = function(cmp_id,result){
    console.log(cmp_id);
    let sql = 'select c.cmp_name,c.city,p_id,p.title,p.start_date,p.duration,p.duration_per,p.stipend,p.last_date,p.loc_intern,p.no_interns,p.part_time,p.skills,p.about,p.apply,p.perks,p.curr_date from company c,post_intern p where p.cmp_id=c.cmp_id && c.cmp_id=?';
   
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

module.exports = postfetch;