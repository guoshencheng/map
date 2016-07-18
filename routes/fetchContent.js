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
      if (result.card) {
        req.contentInfo = result
        result.hotText = textForHotRate(result.ratio)
        result.ratio = parseInt(result.ratio * 100)
        result.card.view = result.card.view || 0
        result.distance = (result.distance / 1000).toFixed(1)
        result.friendPushCount = result.friendPushCount || 0
        next()
      } else {
        res.json('该内容不存在')
      }
    } else {
      res.json({url: 'http://operation.renyan.cn/rest/share/position/' + cid, body: body})
    }
  })
}

function textForHotRate(rate) {
  var hotTexts = ['冰冰冷', '一点也不热', '一般热', '炒鸡热', '热情的沙漠']
  var index = parseInt(rate * hotTexts.length)
  if (index >= hotTexts.length) {
    index = hotTexts.length - 1;
  }
  return hotTexts[index]
}
