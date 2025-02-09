var express = require('express');
var router = express.Router();
const fs = require('fs');
var elastic = require('./elastic');


    router.post('/', async function(req, res, next) {
        console.log(req.query);
        var searchResult;
        if (req.query.q == 'all') {
        searchResult = await elastic.search({
                index: req.query.index,
              });
        }
        else{
        searchResult = await elastic.search({
            index: req.query.index,
            q : req.query.find
          });
        }
          
      res.status(200).send(JSON.stringify(searchResult.hits.hits));
    });
    
    module.exports = router;
