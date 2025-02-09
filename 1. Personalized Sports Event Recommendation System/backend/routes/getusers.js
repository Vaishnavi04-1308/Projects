var express = require('express');
var router = express.Router();
const fs = require('fs');
var elastic = require('./elastic');


    router.post('/', async function(req, res, next) {
        console.log(req.query);
        var searchResult;
        var userResult=[];
        if (req.query.q == 'all') {
        searchResult = await elastic.search({
                index: 'user_data',
              });
    for (let index = 0; index < searchResult.hits.hits.length; index++) {
                searchResult.hits.hits[index]._source['id'] = searchResult.hits.hits[index]._id
                userResult.push(searchResult.hits.hits[index]._source);
                
              }
        }
        else{
          console.log(req.query.q);
        searchResult = await elastic.search({
            index: "user_data",
            q : req.query.q
          });
        }
          
      res.status(200).send(JSON.stringify(userResult));
    });
    
    module.exports = router;
