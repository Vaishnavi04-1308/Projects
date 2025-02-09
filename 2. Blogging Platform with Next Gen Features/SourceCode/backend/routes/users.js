var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', async function(req, res, next) {
  var response;
      await fetch(`https://serpapi.com/search.json?q=${req.query['q']}&api_key=c162828030a31346940c06ce30b23bc7b643089c04a3c01f6c68720706fe285e&location=Chicago,IL,United+States&engine=google`,{mode:'cors'}).then((data) => {
        return data.json();
      }).then((ser) => {
        response = ser;
      })
      res.status(200).send(JSON.stringify(response));
});

module.exports = router;
