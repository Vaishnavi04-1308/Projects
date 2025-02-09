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
        searchResult = await elastic.search({
            index: 'sport_events',
            q : req.query.q
          });
        }
       
        const result = searchResult.hits.hits.filter((event) => event['_source']['approval'] === 'approved')
      res.status(200).send(JSON.stringify(result));
    });
    
    module.exports = router;
