var Ip = require('./model.js')

var addLike = function(ip, like, cb) {
  fetchIp(ip, function(err, result) {
    if (!result) result = new Ip({ip: ip, likes:[]})
    result.likes = result.likes || []
    if (result.likes.includes(like)) {
      cb(err, result, true)
    } else {
      result.likes.push(like)
      result.save(function(err) {
        cb(err, result, false)
      })
    }   
  })
}

var fetchIp = function(ip, cb) {
  var query = Ip.where({ip: ip})
  query.findOne(cb)
}

module.exports = {
  fetchIp: fetchIp,
  addLike: addLike
}
