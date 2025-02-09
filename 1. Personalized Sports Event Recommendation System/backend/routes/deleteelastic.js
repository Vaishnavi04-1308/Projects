var express = require('express');
var router = express.Router();
const fs = require('fs');
var elastic = require('./elastic');


// const loadIntial = async() => {
    router.post('/', async function(req, res, next) {
        var jsonData = req.body;
        console.log(jsonData);
       const deleteResult = await elastic.delete({
        index: req.body.index,
        id: req.body.id,
      })
        res.status(200).send(JSON.stringify(deleteResult));
    });
    
    module.exports = router;