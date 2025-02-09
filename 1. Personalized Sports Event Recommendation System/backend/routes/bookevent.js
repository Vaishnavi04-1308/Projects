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
         jsonData["approval"] = JSON.parse(req.body["select"])["_source"]["approval"];
         jsonData["registered_users"].push(req.body["user_name"]["id"])
      await elastic.update({
          index: 'sport_events',
          id: req.body.id,
          doc: jsonData
        })
        res.status(200).send("Booking Successful");
    });
    
    module.exports = router;