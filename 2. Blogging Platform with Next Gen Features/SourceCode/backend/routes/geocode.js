var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/', async function(req, res, next) {
  var response = [];
// console.log(req.body.events);
if (req.body.events) {
for (let index = 0; index < req.body.events.length; index++) {
  console.log();
  var element = req.body.events[index];
  await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${element.address?element.address:element.location}&key=AIzaSyBv-c0mwKDN4H-H1WjDAwrNkScbrpNpwyM`,{mode:'cors',headers:{
    // Authorization: `Bearer pYXQiOjE0MjI1MzY0NjEsInNjb3BlIjo`,
    Accept: 'application/json'
  }}).then((data) => {
    return data.json();
  }).then((res) => {
    console.log(res);
    element['ltlg'] = res.results[0].geometry
    response.push(element)
  })
  .catch((err) => {
    console.log("err",err);
  })
}
}
else{
  for (let index = 0; index < req.body.restaurants.length; index++) {
   
    var element = req.body.restaurants[index];
    console.log(element);
    await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${element.address?element.address:element.location}&key=AIzaSyBv-c0mwKDN4H-H1WjDAwrNkScbrpNpwyM`,{mode:'cors',headers:{
      // Authorization: `Bearer pYXQiOjE0MjI1MzY0NjEsInNjb3BlIjo`,
      Accept: 'application/json'
    }}).then((data) => {
      return data.json();
    }).then((res) => {
      
      element['ltlg'] = res.results[0].geometry
      response.push(element)
    })
    .catch((err) => {
      console.log("err",err);
    })
  }
}
console.log("res",response);
      res.status(200).send(JSON.stringify(response));
});

module.exports = router;
