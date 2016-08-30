var express = require('express');
var router = express.Router();

router.get('/content/:contentId', function(req, res, next) {
  var text = '郭申成 郭申成郭申成郭申成郭申成郭申成郭申成郭申成郭申成郭申成郭申成郭申成郭申成郭申成郭申成郭申成郭申成郭申成郭申成郭申成郭申成郭申成郭申成郭申成'
  var imageItem = {pictureCut: 'http://img3.fengniao.com/travel/2_960/1850.jpg', type: 2}
  var textItem = {content: text, type: 1}
  var movieItem = {pictureCut: 'http://img3.fengniao.com/travel/2_960/1850.jpg', content: 'http://www.semanticdevlab.com/abc.mp4', type: 3}
  var contentList = [imageItem, textItem, movieItem, textItem, imageItem]
  var contentInfo = {profile: {name: 'guoshencheng', smallPicture:'http://img2.a0bi.com/upload/ttq/20160709/1468043314019.png', view: 100, subscribe: 100}, card: {cardContents:contentList, template: 1, text: text, albumName: '郭申成'}, albums:[]}
  contentInfo.card.isNewType = req.params.contentId == 2
  res.render('content', {contentInfo: contentInfo, share:{}})
})

module.exports = router

