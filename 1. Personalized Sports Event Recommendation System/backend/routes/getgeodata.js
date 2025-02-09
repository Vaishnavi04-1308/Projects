var express = require('express');
var router = express.Router();
var axios = require('axios');


router.get('/', async function(req, res, next) {
    const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${req.query["key"]}+in+${req.query["zipcode"]}&key=AIzaSyA8W5ENK4ZFTgdM1DCJNJk51CxbHSjMOOc`);
        
  res.status(200).send(JSON.stringify(response.data));  
 
});

module.exports = router;
