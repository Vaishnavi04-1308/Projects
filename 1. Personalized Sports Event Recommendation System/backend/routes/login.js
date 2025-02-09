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
        q : req.body["username"]
      }).then(async (data) =>{
        console.log(data.hits.hits.length);
        if(data.hits.hits.length != 0)
        {  
            if(data.hits.hits[0]['_source']['name'] == req.body["username"] && data.hits.hits[0]['_source']['password'] == req.body["password"] && data.hits.hits[0]['_source']['userType'] == req.body["userType"]  && data.hits.hits[0]['_source']['enabled'] == true) {        
                data.hits.hits[0]['_source']['id'] = data.hits.hits[0]['_id'];
                res.status(200).send(JSON.stringify(data.hits.hits[0]['_source']));
            }
            else{
                res.status(500).send(JSON.stringify("user details wrong"));
            }
        }
            else {
                
                res.status(500).send(JSON.stringify("user not found"));
                
            }
        
      }).catch((err) => {
        console.log(err);
      })
      

 
});


module.exports = router;

