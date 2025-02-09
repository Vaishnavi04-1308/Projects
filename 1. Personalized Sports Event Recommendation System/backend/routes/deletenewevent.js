var express = require('express');
var router = express.Router();
const fs = require('fs');
var elastic = require('./elastic');


// const loadIntial = async() => {
    router.post('/', async function(req, res, next) {
        var jsonData = req.body;
        console.log(jsonData);
       const deleteResult = await elastic.delete({
        index: 'sport_events',
        id: req.body.id,
      })
        res.status(200).send("Deleted successfully");
    });
    
    module.exports = router;