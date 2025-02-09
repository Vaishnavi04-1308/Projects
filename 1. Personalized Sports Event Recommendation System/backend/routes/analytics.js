var express = require('express');
var router = express.Router();
const fs = require('fs');
var elastic = require('./elastic');


    router.post('/', async function(req, res, next) {
        console.log(req.query);
        var searchResult;
        var reviewresult=[["Eventname",'No of Users']];
        if (req.query.q == 'all') {
        searchResult = await elastic.search({
                index: 'sport_events',
              });
        for (let index = 0; index < searchResult.hits.hits.length; index++) {
            var tempAr = []
            tempAr.push(searchResult.hits.hits[index]._source['eventname']);
            tempAr.push(searchResult.hits.hits[index]._source['registered_users'].length);
            reviewresult.push(tempAr)
            
        }
        }

          
      res.status(200).send(JSON.stringify(reviewresult));
    });
    
    module.exports = router;
