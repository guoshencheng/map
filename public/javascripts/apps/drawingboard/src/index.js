var utils = require('../utils')
var microevent = require('microevent')
var SimpleUndo = require('simple-undo')

var canvas = document.getElementById('drawingboard')
var color, 
  fillTolerance = 100,
  size = 1
var data = {}
data.coords = {}
data.drawing = false
color = '#000000'

var draw = function() {
  if (data.isDrawing) {
    var ctx = getContext()
    var currentMid = getMidInputCoords(data.coords.current)
    ctx.beginPath()
    ctx.strokeStyle = color
    ctx.moveTo(currentMid.x, currentMid.y)
    ctx.quadraticCurveTo(data.coords.old.x, data.coords.old.y, data.coords.oldMid.x, data.coords.oldMid.y);
	  ctx.stroke();
	  data.coords.old = data.coords.current;
		data.coords.oldMid = currentMid;
  }
  if (requestAnimationFrame) requestAnimationFrame(draw)
}

draw()

canvas.on = function(event, cb) {
  canvas.addEventListener(event, cb, false)
}

canvas.on('touchstart', function(e) {
  onTouchStart(e, getInputCoords(e))
})

canvas.on('touchmove', function(e) {
  onTouchMove(e, getInputCoords(e))
})

canvas.on('touchend', function(e) {
  onTouchStop(e, getInputCoords(e))
})

var onTouchStart = function(e, coords) {
  data.coords.current = data.coords.old = coords
  data.coords.oldMid = getMidInputCoords(coords)
  data.isDrawing = true
  if (!requestAnimationFrame) draw()
  e.stopPropagation()
  e.preventDefault()
}

var onTouchMove = function(e, coords) {
  data.coords.current = coords
  if (!requestAnimationFrame) draw()
  e.stopPropagation()
  e.preventDefault()
}

var onTouchStop = function(e, coords) {
  if (data.isDrawing && (!e.touches || e.touches.length === 0)) {
    data,isDrawing = false
    saveHistory()
    e.stopPropagation()
    e.preventDefault()
  }
}

var getInputCoords = function(e) {
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

var getMidInputCoords = function(coords) {
  return {
    x: data.coords.old.x + coords.x >> 1,
    y: data.coords.old.y + coords.y >> 1
  }
}

/**
 *  init history with simple-undo
 **/
var history = new SimpleUndo({
  maxLength: 10,
  provider: function(done) {
    done(getImage())
  }
})

var saveHistory = function() {
  history.save()
}

var goBackInHistory = function() {
  history.undo(setImage)
}

var goForthInHistory = function() {
  history.redo(setImage)
}

window.goback = goBackInHistory
window.gofont = goForthInHistory
window.clearCanvas = function() {
  var ctx = getContext()
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  saveHistory()
}

var getImage = function() {
  return canvas.toDataURL('image/png')
}

var setImage = function(src) {
  if (!src) return
  var ctx = getContext()
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

var getContext = function() {
  return canvas && canvas.getContext && canvas.getContext('2d') ? canvas.getContext('2d') : null;
}

saveHistory()
  


