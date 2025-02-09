var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', async function(req, res, next) {
  var response;
      await fetch(`https://account.stubhub.com/authorize"`,{mode:'cors',headers:{
        // Authorization: `Bearer pYXQiOjE0MjI1MzY0NjEsInNjb3BlIjo`,
        Accept: 'application/json'
      }}).then((data) => {
        console.log(data);
        response = data
      }).catch((err) => {
        console.log("err",err);
      })
      res.status(200).send(JSON.stringify(response));
});

module.exports = router;
