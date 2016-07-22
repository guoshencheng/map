module.exports = function(req, res, next) {
  //Auth: RyZxAuth
  var cid = req.cardId
  var url = 'http://app.ry.api.renyan.cn/rest/share/position/' + cid
  var request = require('request')
  var options = {
    url: url,
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
        result.friendPushCount = result.friendPushCount || 0
        var distance = result.distance / 1000
        result.distance = distance.toFixed(1)
        if (result.profile && result.profile.name && result.profile.name.indexOf('未命名') != -1) {
          result.profile.name = '新用户'
        }
        next()
      } else {
        res.json('该内容不存在')
      }
    } else {
      res.json({url: url, body: body})
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
