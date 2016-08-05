var domin = require('../config').domin
var paths = require('../config').paths
var request = require('request')
var querystring = require('querystring')
var fetchActivity = function (req, res, next) {
  req.renyan = req.renyan || {}
  var acid = req.params.activityId
  var options = {
    url: domin + paths.FETCH_ACTIVITY,
    qs: {acid: acid}
  }
  request(options, function(error, response, body) {
    var result = JSON.parse(body)
    if (!error && response.statusCode == 200 && result.errorCode === 0) {
      var activity = result.activity
      if (activity) {
        req.renyan.activity = activity
        next()
      } else {
        next(new Error('activity is not exist'))
      }
    } else {
      next(new Error('requst failed'))
    }
  })
}

module.exports = {
  fetchActivity: fetchActivity
}
