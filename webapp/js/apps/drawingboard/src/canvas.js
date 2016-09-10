var canvas = document.getElementById('drawingboard')

var getContext = function() {
  return canvas && canvas.getContext && canvas.getContext('2d') ? canvas.getContext('2d') : null;
}
var context = getContext()
canvas.context = context
canvas.on = function(event, cb) {
  canvas.addEventListener(event, cb, false)
}

module.exports = canvas
