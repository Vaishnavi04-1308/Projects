var express = require('express');
var router = express.Router();
const fs = require('fs');
var elastic = require('./elastic');


// const loadIntial = async() => {
    router.post('/', async function(req, res, next) {
        var jsonData = {}
         jsonData["address"] = req.body["_source"]["address"];
         jsonData["date"] = req.body["_source"]["date"];
         jsonData["eventname"] = req.body["_source"]["eventname"];
        const index = req.body["_source"]["registered_users"].indexOf(req.body["user_id"])
        req.body["_source"]["registered_users"].splice(index, 1)
         jsonData["registered_users"] = req.body["_source"]["registered_users"];
         jsonData["release"] = req.body["_source"]["release"];
         jsonData["timing"] = req.body["_source"]["timing"];
         
       await elastic.update({
          index: 'sport_events',
          id: req.body["_id"],
          doc: jsonData
        })
        res.status(200).send("Cancellation Successfull");
    });
    
    module.exports = router;