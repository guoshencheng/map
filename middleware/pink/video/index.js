var config = require('../config')
var fetchVideo = function(req, res, next) {
  var request = require('request')
  var axios = require('axios')
  var contentId = req.params.contentId
  axios.get(config.domin + config.paths.FETCH_CONTENT, {
    params: {
      cids: contentId, 
      uid: 25
    } 
  })
    .then(function (response) {
      if (response.data.cards && response.data.cards.length > 0) {
        req.renyan.content = response.data.cards[0]
        next()
      } else {
        next(new Error())
      }
  })
  .catch(function (error) {
    next(new Error())
  });
}

module.exports = {
  fetchVideo: fetchVideo
}
