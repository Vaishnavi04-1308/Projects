var express = require('express');
var router = express.Router();
var axios = require('axios');


router.get('/', async function(req, res, next) {
  var location = {};
  if(req.query['isnearme'] == "true")
  {
      paramLocation = JSON.parse(req.query['zipcode'])
      location['lat'] = paramLocation['lat'];
      location['lng'] = paramLocation['lng'];
  }
  else{
  const geocodingResponse = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${req.query['zipcode']}&key=AIzaSyA8W5ENK4ZFTgdM1DCJNJk51CxbHSjMOOc`
  );

     location = geocodingResponse.data.results[0].geometry.location;
  }
    const response = await axios.get('https://api.yelp.com/v3/businesses/search', {
        headers: {
          Authorization: `Bearer pc-uWiQ5kOQzbft1nll8lIu5oapGUBmkY34Ai_Ua4mLCe-zsvfmKjZyET9Ooz1XYukw0RAeRln6MDUk9vzy92fGjwABh5osS4g6wkWFZr8PH3T0nljqfhDRtn6sWZnYx`,
        },
        params: {
          term: req.query["key"],
          latitude: location.lat,
          longitude: location.lng,
        },
      });
      res.status(200).send(JSON.stringify(response.data)); 
    });

module.exports = router;