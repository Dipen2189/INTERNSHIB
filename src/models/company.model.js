var dbConn = require('../../config/db_config');

var companyUser = function(compuser)
{
    this.cmp_id = compuser.cmp_id,
    this.cmp_name = compuser.cmp_name,
    this.emailid = compuser.emailid,
    this.username = compuser.username,
    this.password = compuser.password,
    this.url = compuser.url,
    this.city = compuser.city,
    this.state = compuser.state,
    this.about = compuser.about;

}

//add company user
companyUser.compUser = function(data,result) 
{       
    dbConn.query('INSERT INTO company SET ?', data, function(err, res)
    {
        if(err)
            result(err, null);
        else
            console.log(res)
            result(null, res);
    })
}

//company login
companyUser.login = function(data,result)
{   console.log(data);
    dbConn.query('Select cmp_id,username,password from company where username = ? ', data, function(err, res)
    {
        console.log(res);
        if(err)
        {
            result(err, null);
        }
        else
        {
            result(null, res);     
        }   
    })
}


module.exports = companyUser;