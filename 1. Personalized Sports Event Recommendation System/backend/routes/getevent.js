var express = require('express');
var router = express.Router();
const fs = require('fs');
var elastic = require('./elastic');


    router.post('/', async function(req, res, next) {
        console.log(req.query);
        var searchResult;
        if (req.query.q == 'all') {
        searchResult = await elastic.search({
                index: 'sport_events',
              });
        }
        else{
          console.log(req.query.q);
        searchResult = await elastic.search({
            index: "sport_events",
            q : req.query.q
          });
        }
          
      res.status(200).send(JSON.stringify(searchResult.hits.hits));
    });
    
    module.exports = router;
