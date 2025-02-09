var express = require('express');
var router = express.Router();
const fs = require('fs');
var elastic = require('./elastic');


    router.post('/', async function(req, res, next) {
      console.log(req.body);
      await elastic.index({
  index: req.body.index,
  document: req.body.data
})

      res.status(200).send("Loaded Successfully");
    });
    
    module.exports = router;
