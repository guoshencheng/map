var express = require('express');
var router = express.Router();
var checkCidParam = require('./decodeCid')
var fetchContent = require('./fetchContent')
var signatureUrl = require('./signature')
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

router.get('/activity/image', signatureUrl, function(req, res, next) {
  var imageUrl = req.signatureUrl
  var redirectUrl = 'renyanapp://'
  res.render('imageActivity', {imageUrl: imageUrl, title: '活动', redirectUrl: redirectUrl})
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
