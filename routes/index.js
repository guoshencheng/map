var express = require('express');
var router = express.Router();
var checkCidParam = require('../middleware/decodeCid')
var fetchContent = require('../middleware/fetchContent')
var activity = require('../middleware/activity')
var drawingboard = require('../middleware/drawingboard')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/map/share/:id', checkCidParam, fetchContent, function(req, res, next) {
  renderMap(req, res, true)
})

router.get('/map/:id', checkCidParam, fetchContent, function(req, res, next) {
  renderMap(req, res, false)
})

router.post('/drawingboard/image', drawingboard.postImage)

router.get('/drawingboard/index', function(req, res, next) {
  res.render('drawingboard/index', {title: '画猫'})
})

router.get('/drawingboard/work/:workId', drawingboard.fetchWork, function(req, res, next) {
  var work = req.renyan.work
  res.render('drawingboard/work', {title: 'xxxx的作品', work: work})
})

router.get('/drawingboard/works', function(req, res, next) {
  res.render('drawingboard/works')
})

router.get('/sendMessage', function(req, res, next) {
  res.render('sendMessage', {})
})

router.get('/activity/:activityId', activity.fetchActivity, function(req, res, next) {
  var data = req.renyan.activity
  var close = data.status === 0 && data.resultPicture
  res.render('activity', {
    name: data.name,
    bigPicture: close ? data.resultPicture : data.bigPicture,
    picture: data.picture,
    tpid: data.tpid,
    close: close,
    finish: data.status === 0
  })
})

var renderMap = function(req, res, share) {
  var cid = req.cardId
  var contentInfo = req.contentInfo
  res.render('map', {
    share: share,
    contentInfo: contentInfo,
    cid: req.params.id
  });
}

module.exports = router;
