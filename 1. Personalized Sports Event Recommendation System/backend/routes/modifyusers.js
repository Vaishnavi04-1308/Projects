var express = require('express');
var router = express.Router();
const fs = require('fs');
var elastic = require('./elastic');


// const loadIntial = async() => {
    router.post('/', async function(req, res, next) {
        var jsonData = {}
         jsonData["userType"] = req.body["userType"];
         jsonData["fullname"] = req.body["fullname"];
         jsonData["name"] = req.body["name"];
         jsonData["password"] = req.body["password"];
         jsonData["confirm"] = req.body["confirm"];
         jsonData["enabled"] = req.body["enabled"];
         
       const updateResult = await elastic.update({
          index: 'user_data',
          id: req.body.id,
          doc: jsonData
        })
        res.status(200).send("Updated Successfully");
    });
    
    module.exports = router;