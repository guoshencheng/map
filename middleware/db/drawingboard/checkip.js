var ipdb = require('../../../db/drawingboard').ips

var checkip = function(req, res, next) {
  var ip = req.renyan.ip
  var workId = req.params.workId
  ipdb.addLike(ip, workId, function(err, result, includes) {
    req.renyan.includes = includes
    console.log(result)
    next()
  })
}

module.exports = checkip
