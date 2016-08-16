var ipdb = require('../../../db/drawingboard').ips

var checkip = function(req, res, next) {
  var ip = req.renyan.ip
  var workId = req.params.workId
  ipdb.save(ip, workId, function(err, result, includes) {
    req.renyan.includes = includes
    next()
  })
}
