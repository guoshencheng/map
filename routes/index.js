var express = require('express');
var router = express.Router();
var checkCidParam = require('./decodeCid')
var fetchContent = require('./fetchContent')
var UA = require("useragent")

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

router.get('/activity', function(req, res, next) {
  res.render('activity', {title: '活动'})
})

router.get('/renyan', function(req, res, next) {
  var useragent = req.headers['user-agent']
  var result = UA.parse(req.headers['user-agent'])
  if (result.os.family == 'iOS') {
    res.redirect('renyanapp://')
  } else if (result.os.family == 'Android') {
    res.redirect('renyanapp://')
  } else {
    res.json('hello redirect')
  }
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
