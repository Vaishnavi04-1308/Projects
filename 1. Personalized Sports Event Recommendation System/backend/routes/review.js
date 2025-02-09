var express = require('express');
var router = express.Router();
const fs = require('fs');
var elastic = require('./elastic');


// const loadIntial = async() => {
    router.post('/', async function(req, res, next) {
        var jsonData = {}
         jsonData["address"] = req.body["address"];
         jsonData["date"] = req.body["date"];
         jsonData["eventname"] = req.body["eventname"];
         jsonData["registered_users"] = JSON.parse(req.body["select"])["_source"]["registered_users"];
         jsonData["release"] = req.body["release"];
         jsonData["timing"] = req.body["timing"];
        //  jsonData["reviews"] = JSON.parse(req.body["select"])["_source"]["reviews"] ? JSON.parse(req.body["select"])["_source"]["reviews"] : [];
         var tempArr = JSON.parse(JSON.parse(req.body["select"])["_source"]["reviews"]) ? JSON.parse(JSON.parse(req.body["select"])["_source"]["reviews"]) : [];
         tempArr.push(req.body["review"])
         jsonData["reviews"] = JSON.stringify(tempArr);
       const updateResult = await elastic.update({
          index: 'sport_events',
          id: req.body.id,
          doc: jsonData
        })
        res.status(200).send("Written Successfully");
    });
    
    module.exports = router;