module.exports = function(req, res, next) {
  var request = require('request')
  var cid = req.cardId
  request('http://operation.renyan.cn/rest/share/position/' + cid, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var result = JSON.parse(body)
      req.contentInfo = result
      next()
    } else {
      res.json({url: 'http://operation.renyan.cn/rest/share/position/' + cid})
    }
  })
}
