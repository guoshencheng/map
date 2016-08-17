var express = require('express');
var router = express.Router();
var drawingboard = require('../middleware/drawingboard')
var config = require('../config')
var headers = require('../middleware/header')
var checkip = require('../middleware/db/drawingboard/checkip')

router.post('/image', drawingboard.postImage)

router.get('/index', function(req, res, next) {
  var share = {
    text: '一起来参加人言十万猫星人拯救计划',
    image: 'http://7xpecj.com1.z0.glb.clouddn.com/2/renyan_logo.png',
    link: config.shareDomin + '/drawingboard/index'
  }
  res.render('drawingboard/index', {title: '画猫', share: share})
})

router.get('/index/app', function(req, res, next) {
  var share = {
    text: '一起来参加人言十万猫星人拯救计划',
    image: 'http://7xpecj.com1.z0.glb.clouddn.com/2/renyan_logo.png',
    link: config.shareDomin + '/drawingboard/index'
  }
  res.render('drawingboard/index_app', {title: '猫粮计划', share: share})
})


router.get('/like/:workId',headers.getRemoteAddress, checkip, drawingboard.likeWork)

router.get('/work/:workId', drawingboard.fetchWork, function(req, res, next) {
  var work = req.renyan.work
  var share = {
    text:   '这个人' + '画出了一只叫做' + work.name +  '的猫！快分享给大家，让大家快来围观啊！',
    image: work.image,
    link: config.shareDomin + '/drawingboard/work/' + req.params.workId
  }
  res.render('drawingboard/work', {title: 'xxxx的作品', work: work, me: false, share: share})
})

router.get('/work/:workId/me', drawingboard.fetchWork, function(req, res, next) {
  var work = req.renyan.work
  var share = {
    text:   '我' + '画出了一只叫做' + work.name +  '的猫！快分享给大家，让大家快来围观啊！',
    image: work.image,
    link: config.shareDomin + '/drawingboard/work/' + req.params.workId
  }
  res.render('drawingboard/work', {title: 'xxxx的作品', work: work, me: true, share: share})
})

router.get('/works', drawingboard.fetchWorks, function(req, res, next) {
  var works = req.renyan.works
  var share = {
    text: '一起来参加人言十万猫星人拯救计划',
    image: 'http://7xpecj.com1.z0.glb.clouddn.com/2/renyan_logo.png',
    link: config.shareDomin + '/drawingboard/works'
  }
  res.render('drawingboard/works', {title: '围观作品', works: works, share: share})
})

router.get('/readme', function(req, res, next) {
   res.render('drawingboard/readme')
})

module.exports = router
