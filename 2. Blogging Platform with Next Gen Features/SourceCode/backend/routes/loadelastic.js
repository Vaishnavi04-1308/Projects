var express = require('express');
var router = express.Router();
const fs = require('fs');
var elastic = require('./elastic');


// const loadIntial = async() => {
    router.get('/', async function(req, res, next) {
    // const jsonData = JSON.parse(fs.readFileSync('routes/post.json','utf-8'));
    // for (let index = 0; index < jsonData['posts'].length; index++) {
    //         await elastic.index({
    //         index: 'posts_v5' ,
    //         document: {
    //             category : Object.keys(jsonData['posts'][index])[0],
    //             body : jsonData['posts'][index][Object.keys(jsonData['posts'][index])[0]]
    //         }
    //       })
        
    // }

    
    // const result = await elastic.search({
    //     index: 'posts_v5',
    //     query: {
    //         match_all: {}
    //       }

    //   }).catch((err) =>{
    // console.log("err",err);
    //   })

      res.status(200).send("result");
    });
    
    module.exports = router;
// }
// loadIntial();

// module.exports = loadIntial;