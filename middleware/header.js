var getRemoteAddress = function(req, res, next) {
  req.renyan.ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
  next()
}

module.exports = {
  getRemoteAddress: getRemoteAddress
}
