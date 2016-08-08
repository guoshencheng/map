var canvas = require('./canvas')

var getImage = function() {
  return canvas.toDataURL('image/png')
}

var setImage = function(src) {
  if (!src) return
  var ctx = canvas.context
  var img = new Image()
  var oldGCO = ctx.globalCompositeOperation
  img.onload = function() {
    ctx.globalCompositeOperation = "source-over"
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = oldGCO
  }
  img.src = src
}

module.exports = {
  getImage: getImage,
  setImage: setImage
}

