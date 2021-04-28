var studentedit = require('../../models/studedit.model')
var fetch = require('node-fetch')
var fs = require('fs')

exports.show = function(req, res){
  console.log(req.params)
  studentedit.showDetails(req.params.id,function(err,result){
    console.log(result)
    if(err)
    {
      console.log("Error while displaying values in form");
    }
    else
    {     
      res.render('student/studedit', {SuccessMsg: req.flash('Success'), ErrorMsg: req.flash('Error'), title: 'Edit', result:result[0]});
    }
  })
};


exports.change = function(req,res)
{
 
  if(req.method == 'POST')
  {
    studentedit.saveChanges(req.params.id, req.body,function(err,result){
      if(err)
      {
        throw err;
      }
      else
      {
        req.flash('Success','Changes updated successfully!')
        res.render('student/studedit', {SuccessMsg: req.flash('Success'), ErrorMsg: req.flash('Error'), title: 'Edit',result});
      }
    })
  }
}

exports.download = function(req,res) {
{
  studentedit.showDetails(req.params.id,function(err,result){
    res.writeHead(200, {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=some_file.pdf',
      
    });
    res.end(result[0].resum);
    //fs.createWriteStream('objectId' + '.pdf').write(result[0].resum);
  });
     
    
}
}
