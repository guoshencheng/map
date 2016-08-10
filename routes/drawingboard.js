var express = require('express');
var router = express.Router();
var drawingboard = require('../middleware/drawingboard')

router.post('/image', drawingboard.postImage)

router.get('/index', function(req, res, next) {
  res.render('drawingboard/index', {title: '画猫'})
})

router.get('/index/app', function(req, res, next) {
  res.render('drawingboard/index_app', {title: '猫粮计划'})
})

router.get('/work/:workId', drawingboard.fetchWork, function(req, res, next) {
  var work = req.renyan.work
  res.render('drawingboard/work', {title: 'xxxx的作品', work: work, me: false})
})

router.get('/work/:workId/me', drawingboard.fetchWork, function(req, res, next) {
  var work = req.renyan.work
  res.render('drawingboard/work', {title: 'xxxx的作品', work: work, me: true})
})

router.get('/works', drawingboard.fetchWorks, function(req, res, next) {
  var works = req.renyan.works
  res.render('drawingboard/works', {title: '围观作品', works: works})
})

module.exports = router
