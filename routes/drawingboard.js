var express = require('express');
var router = express.Router();
var drawingboard = require('../middleware/drawingboard')
var config = require('../config')
var headers = require('../middleware/header')
var checkip = require('../middleware/db/drawingboard/checkip')
var defaultTitle = '十万喵星人拯救计划'
var defaultText = '一起来参加人言十万喵星人拯救计划'
router.post('/image', drawingboard.postImage)

router.get('/index', function(req, res, next) {
  var share = {
    text: defaultText,
    image: 'http://7xpecj.com1.z0.glb.clouddn.com/2/renyan_logo.png',
    link: config.shareDomin + '/drawingboard/index/app'
  }
  res.render('drawingboard/index', {title: defaultTitle, share: share, env: process.env.NODE_ENV})
})

router.get('/index/app', function(req, res, next) {
  var share = {
    text: defaultText,
    image: 'http://7xpecj.com1.z0.glb.clouddn.com/2/renyan_logo.png',
    link: config.shareDomin + '/drawingboard/index/app'
  }
  res.render('drawingboard/index_app', {title: defaultTitle, share: share, env: process.env.NODE_ENV})
})

router.get('/like/:workId',headers.getRemoteAddress, checkip, drawingboard.likeWork)

router.get('/work/:workId', drawingboard.fetchWork, function(req, res, next) {
  var work = req.renyan.work
  var share = {
    text: '这是我画的喵星人' + (work.name ? work.name : '') + '！快来完成\"十万喵星人拯救计划\"吧>>>',
    image: work.image,
    link: config.shareDomin + '/drawingboard/work/' + req.params.workId
  }
  res.render('drawingboard/work', {title: defaultTitle, work: work, me: false, share: share, env: process.env.NODE_ENV})
})

router.get('/work/:workId/me', drawingboard.fetchWork, function(req, res, next) {
  var work = req.renyan.work
  var share = {
    text: '这是我画的喵星人' + (work.name ? work.name : '') + '！快来完成\"十万喵星人拯救计划\"吧>>>',
    image: work.image,
    link: config.shareDomin + '/drawingboard/work/' + req.params.workId
  }
  res.render('drawingboard/work', {title: defaultTitle, work: work, me: true, share: share, env: process.env.NODE_ENV})
})

router.get('/works', drawingboard.fetchWorks, function(req, res, next) {
  var works = req.renyan.works
  var share = {
    text: defaultText,
    image: 'http://7xpecj.com1.z0.glb.clouddn.com/2/renyan_logo.png',
    link: config.shareDomin + '/drawingboard/works'
  }
  res.render('drawingboard/works', {title: defaultTitle, works: works, share: share, env: process.env.NODE_ENV})
})

router.get('/readme', function(req, res, next) {
   var share = {
     text: defaultText,
     image: 'http://7xpecj.com1.z0.glb.clouddn.com/2/renyan_logo.png',
     link: config.shareDomin + '/drawingboard/index/app'
   }
   res.render('drawingboard/readme', {env: process.env.NODE_ENV, share: share, title:defaultTitle})
})

module.exports = router
