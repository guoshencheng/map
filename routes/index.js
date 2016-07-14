var express = require('express');
var router = express.Router();
var checkCidParam = require('./decodeCid')
var fetchContent = require('./fetchContent')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/map/share/:id', function(req, res, next) {
  
})

router.get('/map/:id', checkCidParam, fetchContent, function(req, res, next) {
  var cid = req.cardId
  var contentInfo = req.contentInfo
  contentInfo.ratio = parseInt(contentInfo.ratio * 100)
  contentInfo.card.view = contentInfo.card.view || 0
  contentInfo.distance = (contentInfo.distance / 1000).toFixed(1)
  contentInfo.friendPushCount = contentInfo.friendPushCount || 0
  res.render('map', {
    share: true,
    contentInfo: contentInfo,
    cid: req.params.id
  });
}) 

module.exports = router;
