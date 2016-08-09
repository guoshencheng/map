var domin = require('../config').domin
var paths = require('../config').paths
var request = require('request')
var postImage = function (req, res, next) {
  req.renyan = req.renyan || {}
  var data = req.body
  var options = {
    method: 'POST',
    url: domin + paths.POST_DRAW_IMAGE,
    body: data,
    json: true
  }
  request(options, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      res.json(body)
    } else {
      next(new Error())
    }
  })
}

var fetchWork = function(req, res, next) {
  var workId = req.params.workId
  var options = {
    url: domin + paths.GET_DRAW_IMAGE + workId,
  }
  request(options, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      var result = JSON.parse(body)
      req.renyan.work = result
      next()
    } else {
      next(new Error())
    }
  })
}

var fetchWorks = function(req, res, next) {
  var options = {
    url: domin + paths.GET_DRAW_WORKS,
    qs:{curPage:1, pageSize: 20}
  }
  request(options, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      var result = JSON.parse(body)
      req.renyan.works = result
      next()
    } else {
      next(new Error())
    }
  })
}

module.exports = {
  postImage: postImage,
  fetchWork: fetchWork,
  fetchWorks: fetchWorks
}
