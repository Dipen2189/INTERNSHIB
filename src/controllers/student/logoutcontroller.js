exports.logout = function(req,res){
    console.log('successfully logout');
    req.session.destroy();          
    res.redirect('/');        
 }