var oss = require('ali-oss')

var signatureUrl =  function(req, res, next) {
  var store = oss({
    accessKeyId: 'RElDKIQs0SDLZVnu',
    accessKeySecret: 'RiZVUGgVkH4r5Jp7bjzCgYzopVlZkr',
    bucket: 'testrenyanpicture',
    region: 'oss-cn-hangzhou'
  })
  var url = store.signatureUrl(req.params.id, {
    expires: 3600
  })
  if (url) {
    req.signatureUrl = url
    next()
  } else {
    next(new Error('Can not get url'))
  }
}

module.exports = signatureUrl
