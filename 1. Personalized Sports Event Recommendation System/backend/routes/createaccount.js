var express = require('express');
var router = express.Router();
const fs = require('fs');
var elastic = require('./elastic');
// var mysql = require('mysql');
// var pool  = mysql.createPool({
//     host     : 'real-estate.cobnlzopusig.us-east-2.rds.amazonaws.com',
//     user     : 'admin',
//     password : 'Django#420',
//     database : 'real_estate'
//     });
/* GET users listing. */
router.post('/', async function(req, res, next) {
console.log(req.body);
    var responseData = 500;
   await elastic.search({
        index: "user_data",
        q : req.body["name"]
      }).then((data) =>{
        console.log(data.hits.hits.length);
        if(data.hits.hits.length != 0)
        {           
            responseData = 200
        }
      }).catch((err) => {
        console.log(err);
      })
      
if (responseData == 200) {
    res.status(500).send(JSON.stringify("user already exists"));
}
else {
    await elastic.index({
        index: "user_data",
        document: req.body
      })
    
    res.status(200).send(JSON.stringify("user created successfully"));
    
}
 
});


module.exports = router;

