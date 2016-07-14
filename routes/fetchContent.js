module.exports = function(req, res, next) {
  //Auth: RyZxAuth
  var cid = req.cardId
  var request = require('request')
  var options = {
    url: 'http://operation.renyan.cn/rest/share/position/' + cid,
    headers: {
      'Auth': 'RyZxAuth'
    }
  }
  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var result = JSON.parse(body)
      req.contentInfo = result
      next()
    } else {
      res.json({url: 'http://operation.renyan.cn/rest/share/position/' + cid, body: body})
    }
  })
}
