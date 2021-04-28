var dbConn = require('../../config/db_config')

var edit = function(stuedit) 
{
    this.stud_name = stuedit.stud_name,
    this.emailid = stuedit.emailid,
    this.username = stuedit.username,
    this.password = stuedit.password,
    this.clg_name = stuedit.clg_name,
    this.branch = stuedit.branch,
    this.semester = stuedit.semester,
    this.cgpa = stuedit.cgpa,
    this.yop = stuedit.yop;
    //this.resum = stuedit.resum;
}

//set the already existing data into fields
edit.showDetails = function(data,result)
{
    dbConn.query('Select * from student where stud_id = ?', data,function(err,res){
        if(err)
        {
            console.log("Error while displaying values");
            result(err,null);
        }
        else
        {
            result(null,res);
        }
    })
}

edit.saveChanges = function(id, data,result)
{
    dbConn.query('Update student set ? where stud_id = ?',[data, id],function(err,res){
        if(err)
        {
            console.log("Error while updating changes")
            result(err,null)
        }
        else
        {
            console.log("Updated Record")
            //console.log(res)
            console.log(data)
            result(null,res)
        }
    })
}


module.exports = edit;