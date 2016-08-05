var express = require('express');
var router = express.Router();
var checkCidParam = require('./decodeCid')
var fetchContent = require('./fetchContent')

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

router.get('/drawingboard/index', function(req, res, next) {
  res.render('drawingboard/index', {title: '画猫'})
})

router.get('/sendMessage', function(req, res, next) {
  res.render('sendMessage', {})
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
