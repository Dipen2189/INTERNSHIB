//const {Client} = require("@googlemaps/google-maps-services-js");
//var geohash = require('ngeohash');
//const axiosInstance = require('axios');
//require('dotenv').config();

//const url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=500&types=food&name=harbour&key=AIzaSyCVgctLYDAMa_iuyIKHno3zRjOz5_-mcEc"

exports.getlocation = function(req, res) {
    //console.log(geohash.encode(37.8324, 112.5584));
    // prints ww8p1r4t8
    //var latlon = geohash.decode('ww8p1r4t8');
    //console.log(latlon.latitude);
    //console.log(latlon.longitude);  
    res.render('student/location', { SuccessMsg: req.flash('Success'), ErrorMsg: req.flash('Error'), title: 'location' });
}

/*exports.locationSearch = function(req,res){
const client = new Client({});

client
  .elevation({
    params: {
      locations: [{ lat: 45, lng: -110 }],
      key: 'AIzaSyCVgctLYDAMa_iuyIKHno3zRjOz5_-mcEc'
    },
    timeout: 1000 // milliseconds
  }, axiosInstance
    )
  .then(r => {
    console.log(r.data.results[0].elevation);
    res.render('location',{map : `${r.data.results[0].elevation}`});
  })
  .catch(e => {
    console.log(e);
  });
}*/