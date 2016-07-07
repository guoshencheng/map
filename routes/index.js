var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/map', function(req, res, next) {
  var p1 = {lng:116.399, lat:39.910}
  var p2 = {lng:121.43333, lat:34.50000}
  var p3 = {lng:115.55, lat:28.4}
  var points1 = [
    p2,
    {lng:120.20000, lat:32.266667},
  ]
  
  var points3 = [{lng:123.25, lat:41.48}, {lng:111.41, lat:40.48}, {lng:101.48, lat:36.38}]
  var points2 = [{lng:113.23333, lat:23.16667},
    {lng:113.51667, lat:22.30000}, p3]
  p1.children = points1
  p2.children = points2
  p3.children = points3
  res.render('map', {point: p1});
}) 

module.exports = router;
