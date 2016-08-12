var express = require('express');
var router = express.Router();
var config = require('../config')
var fetchContent = require('../middleware/fetchContent')
var checkCidParam = require('../middleware/decodeCid')

router.get('/share/:id', checkCidParam, fetchContent, function(req, res, next) {
  renderMap(req, res, true)
})

router.get('/:id', checkCidParam, fetchContent, function(req, res, next) {
  renderMap(req, res, false)
})

var renderMap = function(req, res, out) {
  var cid = req.params.id
  var contentInfo = req.contentInfo
  var share = {
    text: contentInfo.profile.name + '分享了一条'+ contentInfo.hotText + '的人言，快来帮TA传播一下~',
    image: contentInfo.card.pictureCut,
    link: config.shareDomin + '/map/share/' + cid
  }
  res.render('map', {
    out: out,
    contentInfo: contentInfo,
    cid: req.params.id,
    share: share
  });
}

module.exports = router
