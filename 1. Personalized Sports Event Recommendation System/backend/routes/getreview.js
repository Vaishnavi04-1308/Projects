var express = require('express');
var router = express.Router();
const fs = require('fs');
var elastic = require('./elastic');


    router.post('/', async function(req, res, next) {
        console.log(req.query);
        var searchResult;
        searchResult = await elastic.get({
            index: "sport_events",
            id: req.query.q
          });

          
      res.status(200).send(JSON.stringify(searchResult));
    });
    
    module.exports = router;
