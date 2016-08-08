var undo = require('./undo')
module.exports = function(canvas) {
  var drawingboard = {}
  
  drawingboard.canvas = canvas
  drawingboard.coords = {}
  drawingboard.drawing = false
  drawingboard.size = 1 
  drawingboard.color = '#000000'
  
  drawingboard.getInputCoords = function(e) {
    e = e.originalEvent ? e.originalEvent : e
    var rect = canvas.getBoundingClientRect()
    var width = canvas.width
    var height = canvas.height
    var x, y
    if (e.touches && e.touches.length == 1) {
      x = e.touches[0].pageX
      y = e.touches[0].pageY   
    } else {
      x = e.pageX
      y = e.pageY
    }
    x = x - canvas.offsetLeft
    y = y - canvas.offsetTop
    x *= (width / rect.width)
    y *= (height / rect.height)
    return {x: x, y: y}
  }

  drawingboard.getMidInputCoords = function(coords) {
    return {
      x: drawingboard.coords.old.x + coords.x >> 1,
      y: drawingboard.coords.old.y + coords.y >> 1
    }
  }

  drawingboard.draw = function() {
    if (drawingboard.drawing) {
      var ctx = canvas.context
      ctx.lineWidth = drawingboard.size
      ctx.strokeStyle = drawingboard.color
      var currentMid = drawingboard.getMidInputCoords(drawingboard.coords.current)
      ctx.beginPath()
      ctx.strokeStyle = drawingboard.color
      ctx.moveTo(currentMid.x, currentMid.y)
      ctx.quadraticCurveTo(drawingboard.coords.old.x, drawingboard.coords.old.y, drawingboard.coords.oldMid.x, drawingboard.coords.oldMid.y);
      ctx.stroke();
      drawingboard.coords.old = drawingboard.coords.current;
      drawingboard.coords.oldMid = currentMid;
  }
  if (requestAnimationFrame) requestAnimationFrame(drawingboard.draw)
  }
  
  canvas.on('touchstart', function(e) {
    onTouchStart(e, drawingboard.getInputCoords(e))
  })

  canvas.on('touchmove', function(e) {
    onTouchMove(e, drawingboard.getInputCoords(e))
  })

  canvas.on('touchend', function(e) {
    onTouchStop(e, drawingboard.getInputCoords(e))
  })
  
  var onTouchStart = function(e, coords) {
    drawingboard.coords.current = drawingboard.coords.old = coords
    drawingboard.coords.oldMid = drawingboard.getMidInputCoords(coords)
    drawingboard.drawing = true
    if (!requestAnimationFrame) drawingboard.draw()
    e.stopPropagation()
    e.preventDefault()
  }

  var onTouchMove = function(e, coords) {
    drawingboard.coords.current = coords
    if (!requestAnimationFrame) drawingboard.draw()
    e.stopPropagation()
    e.preventDefault()
  }

  var onTouchStop = function(e, coords) {
    if (drawingboard.drawing && (!e.touches || e.touches.length === 0)) {
      drawingboard.drawing = false
      undo.saveHistory()
      e.stopPropagation()
      e.preventDefault()
    }
  }
  return drawingboard
}
