var express = require('express');
var router = express.Router();
const fs = require('fs');
var elastic = require('./elastic');


// const loadIntial = async() => {
    router.post('/', async function(req, res, next) {
        var jsonData = req.body;
        console.log(jsonData);
       const updateResult = await elastic.update({
          index: req.body.index,
          id: req.body.id,
          doc: req.body.data
        })
        res.status(200).send(JSON.stringify(updateResult));
    });
    
    module.exports = router;