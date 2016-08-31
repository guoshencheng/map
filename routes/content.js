var express = require('express');
var config = require('../config')
var router = express.Router();
var fetchContent = require('../middleware/fetchContent')
var decodeCid = require('../middleware/decodeCid')

router.get('/share/:encodeCid', decodeCid.checkCidParam, fetchContent.fetchMapContent, function(req, res, next) {
  var contentInfo = req.contentInfo
  var share = {
    text: '我分享了一条'+ contentInfo.profile.name + '的人言，快来帮TA传播一下~',
    image: contentInfo.card.pictureCut,
    link: config.shareDomin + '/content/share/' + req.param.encodeCid
  }
  res.render('content', {contentInfo: contentInfo, share:share})
})

module.exports = router

