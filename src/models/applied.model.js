const dbConn = require('../../config/db_config')

var applied = function(get)
{
    this.cmp_name = get.cmp_name,
    this.state = get.state,
    this.city = get.city,
    this.cmp_id = get.cmp_id,
    this.stud_id = get.stud_id  
}

applied.display_internship = function(stud_id,result)
{
    console.log('stud_id',stud_id);
    dbConn.query('select c.cmp_name,c.state,c.city,a.status from company c inner join apply a on c.cmp_id=a.cmp_id where a.stud_id=? ',stud_id,function(err,res)
    {
        if(err)
        {
            result(err,null);
        }
        else
        {  
            console.log(res)          
            result(null,res);
            
        }
    })
}

module.exports = applied;