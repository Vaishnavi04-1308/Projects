var express = require('express');
var router = express.Router();
const fs = require('fs');
var elastic = require('./elastic');


// const loadIntial = async() => {
    router.post('/', async function(req, res, next) {
        var jsonData = req.body;
        console.log(req.body);
        for (let index = 0; index < jsonData['posts'].length; index++) {
            var id_post = jsonData["ids"][Object.keys(jsonData['posts'][index])[0]]
            console.log(jsonData['posts'][index][Object.keys(jsonData['posts'][index])[0]]);
                await elastic.update({
                index: 'posts_v5' ,
                id : id_post,
                doc: {
                    category : Object.keys(jsonData['posts'][index])[0],
                    body : jsonData['posts'][index][Object.keys(jsonData['posts'][index])[0]]
                }
              }).catch((err) => {
                console.log("err",err);
              })
        await elastic.get({
        index: 'posts_v5',
        id: id_post
      })
            
        }
        const result = await elastic.search({
            index: 'posts_v5',
            query: {
                match_all: {}
              }
            // query: {
            //   match: { category: 'Academic Resources' }
            // }
          }).catch((err) =>{
        console.log("err",err);
          })
        // const document = await elastic.update({
        //     index: 'posts_v4',
        //     doc: {
        //        data 
        //     }
        //   })
        res.status(200).send(JSON.stringify(result));
    });
    
    module.exports = router;