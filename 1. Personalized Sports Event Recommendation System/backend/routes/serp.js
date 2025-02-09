var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', async function(req, res, next) {
  var response;
      await fetch(`https://serpapi.com/search.json?q=${req.query['q']}&api_key=63b74192c5e921b5bd805a42d340d1ad12c66edec46d4279a74f3c14da478135&location=Chicago,IL,United+States&engine=google`,{mode:'cors'}).then((data) => {
        return data.json();
      }).then((ser) => {
        response = ser;
      })
      res.status(200).send(JSON.stringify(response));
});

module.exports = router;
