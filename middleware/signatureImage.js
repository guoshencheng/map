
var urls = require('../config').urls
var signatureUrl = urls.IMAGE_SIGNATURE_URL
var request = require('request')
var querystring = require('querystring')
var signatureImageFromServer = function (req, res, next) {
  var imageKey = req.query.imageKey
  if (!imageKey) {
    next(new Error('without imageKey'))
    return
  }
  var options = {
    url: signatureUrl,
    qs: {resources:imageKey}
  }
  request(options, function(error, response, body) {
    if (!error && response.statusCode == 200 && body.errorCode && body.errorCode === 0) {
      var signatures = body.signatures
      if (signatures && signatures.length > 0) {
        var signature = signatures[0]
        if (signature.url) {
          req.signatureUrl = signature.url
          next()
        } else {
          next(new Error('has no signature url for ' + signature.resource))
        }
      } else {
        next(new Error('signatures is Empty'))
      }
    } else {
      next(new Error('request ' + signatureUrl +' is failed'))
    }
  })
}

module.exports = {
  signatureImage: signatureImageFromServer
}
