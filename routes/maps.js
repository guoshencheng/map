var express = require('express');
var router = express.Router();
var fetchContent = require('../middleware/fetchContent')
var checkCidParam = require('../middleware/decodeCid')

router.get('/share/:id', checkCidParam, fetchContent, function(req, res, next) {
  renderMap(req, res, true)
})

router.get('/:id', checkCidParam, fetchContent, function(req, res, next) {
  renderMap(req, res, false)
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

module.exports = router