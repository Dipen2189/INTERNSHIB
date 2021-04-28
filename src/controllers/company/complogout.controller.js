exports.complogout = function(req,res){
    req.session.destroy(function(err){
        if(err) {
            return next(err);
        } else {
            req.session = null;
            console.log("logout successful");
            return res.redirect('/');
        }
    })   
}