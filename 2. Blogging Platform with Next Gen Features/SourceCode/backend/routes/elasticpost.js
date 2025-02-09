
var express = require('express');
var router = express.Router();
var elastic = require('./elastic');

/* GET users listing. */
router.get('/', async function(req, res, next) {
    await elastic.indices.create({
        index: 'tweets',
        operations: {
          mappings: {
            properties: {
              id: { type: 'integer' },
              text: { type: 'text' },
              user: { type: 'keyword' },
              time: { type: 'date' }
            }
          }
        }
      }, { ignore: [400] })
      const dataset = [{
        id: 1,
        text: 'If I fall, don\'t bring me back.',
        user: 'jon',
        time: new Date()
      }, {
        id: 2,
        text: 'Winter is coming',
        user: 'ned',
        time: new Date()
      }, {
        id: 3,
        text: 'A Lannister always pays his debts.',
        user: 'tyrion',
        time: new Date()
      }, {
        id: 4,
        text: 'I am the blood of the dragon.',
        user: 'daenerys',
        time: new Date()
      }, {
        id: 5, // change this value to a string to see the bulk response with errors
        text: 'A girl is Arya Stark of Winterfell. And I\'m going home.',
        user: 'arya',
        time: new Date()
      }]
    
      const operations = dataset.flatMap(doc => [{ index: { _index: 'tweets' } }, doc])
    
      const bulkResponse = await elastic.bulk({ refresh: true, operations })
const result = await elastic.search({
    index: 'tweets',
    query: {
      match: { user: 'daenerys' }
    }
  }).catch((err) =>{
console.log("err",err);
  })
  res.status(200).send(JSON.stringify(result));
});
module.exports = router;