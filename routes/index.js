var express = require('express');
var router = express.Router();
var activity = require('../middleware/activity')
var pink = require('../middleware/pink')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/sendMessage', function(req, res, next) {
  res.render('sendMessage', {})
})

router.get('/video/:contentId',  pink.video.fetchVideo, function(req, res, next) {
  var content = req.renyan.content
  res.render('video', {content: content})
})

router.get('/activity/:activityId', activity.fetchActivity, function(req, res, next) {
  var data = req.renyan.activity
  var close = data.status === 0 
  res.render('activity', {
    name: data.name,
    bigPicture: close ? data.resultPicture : data.bigPicture,
    picture: data.picture,
    tpid: data.tpid,
    close: close,
    finish: close
  })
})

router.get('/react', function(req, res, next) {
  res.render('myReact', {})
})

module.exports = router;
