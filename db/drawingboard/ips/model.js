var mongoose = require('mongoose')
var connection = require('../connection').default
var ipSchema = mongoose.Schema({
  ip: String,
  likes:[String]
})

var Ip = connection.model('Ip', ipSchema)
module.exports = Ip
