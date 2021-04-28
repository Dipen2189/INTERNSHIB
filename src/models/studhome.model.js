const dbConn = require('../../config/db_config');

const postedCompanies = function(fetchData){
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
    this.perks = fetchData.perks
}

postedCompanies.show = function(result)
{  
    dbConn.query('select c.cmp_name,c.city,p.* from company c,post_intern p where p.cmp_id = c.cmp_id',(err,res)=>{
        if(err)
        {
            result(err,null);
        }
        else
        {            
            result(null,res);
        }
    })
}

module.exports = postedCompanies;