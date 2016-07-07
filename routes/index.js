var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/map/:id', function(req, res, next) {
  var cid = req.params.id
  var request = require('request');
  request('http://operation.renyan.cn/rest/share/position/' + cid, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    var result = JSON.parse(body);
    res.render('map', {point: result.position});
  } else {
    res.json({error})
  }
})
}) 

module.exports = router;
