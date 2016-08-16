var config = require('../../config').mongodb
var mongoose = require('mongoose')
var connection = mongoose.createConnection(config + '/drawingboard')

module.exports = {
  default: connection
}
