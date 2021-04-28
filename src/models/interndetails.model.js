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
    this.aboutus = fetchData.aboutus,
    this.about = fetchData.about,
    this.apply = fetchData.apply,
    this.perks = fetchData.perks
}

postedCompanies.view = function(p_id,result)
{  
    console.log(p_id)
    dbConn.query('select c.cmp_name,c.aboutus,c.city,p.* from company c,post_intern p where p.cmp_id=c.cmp_id && p_id = ?',p_id,(err,res)=>{
        //console.log(res);
        if(res.length== 0)
        {
            result(err,null);
        }
        else
        {            
            result(null,res);
        }
    })
}

postedCompanies.apply = function(data,result)
{
    console.log('data123', data);
    var query = dbConn.query('insert into apply set ?',data,function(err,res){
        if(err)
        {
            console.log("Error while adding values")
            result(err,null)
        }
        else
        {
            result(null,res)
        }
    })
    console.log(query.sql);
}
module.exports = postedCompanies;