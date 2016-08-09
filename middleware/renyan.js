module.exports = function(req, res, next) {
  req.renyan = req.renyan || {renyan: true}
  next()
}
