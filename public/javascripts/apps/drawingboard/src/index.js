var canvas = require('./canvas')
var undo = require('./undo')
var drawingboard = require('./drawingboard')(canvas)
var image = require('./image')
var pencil = document.getElementById('pencil')
var eraser = document.getElementById('eraser')
var small = document.getElementById('small_size')
var middle = document.getElementById('middle_size')
var large = document.getElementById('large_size')
var tool = [pencil, eraser]
var size = [small, middle, large]
var ajax = require('./ajax')

window.goback = undo.goBackInHistory
window.gofront = undo.goForthInHistory
window.clearCanvas = function() {
  var ctx = canvas.context
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  undo.saveHistory()
}

var setSizeOfElement = function(element) {
  if (element == large) {
    drawingboard.size = 10 
  } else if (element == middle) {
    drawingboard.size = 5
  } else {
    drawingboard.size = 1
  }
}

var setColorOfElement = function(element) {
  if (eraser == element) {
    drawingboard.mode = 'eraser'
  } else {
    drawingboard.mode = 'pencil'
  }
}

var clicktool = function() {
  var current = this
  setColorOfElement(current)
  tool.forEach(function(child) {
    if (child == current) {
      child.style.backgroundColor = 'white'
      child.style.color = 'black'
    } else {
      child.style.backgroundColor = 'black'
      child.style.color = 'white'
    }
  })
}

var clickSize = function() {
  var current = this
  setSizeOfElement(current)
  size.forEach(function(child) {
    var icon = child.getElementsByClassName('size_icon')[0]
    if (child == current) {
      icon.style.backgroundColor = 'white'
    } else {
      icon.style.backgroundColor = 'black'
    }
  })
}

var uploadImage = function(username) {
  var data = image.getImage()
  var base64Data = data.substr(22)
  ajax({
      type: 'POST',
      url: '/drawingboard/image',
      data: JSON.stringify({image: base64Data, name: username}),
      success: function (data) {
        if (data.param) {
          var param = data.param
          window.location.href = '/drawingboard/work/' + param + '/me'
        }
      }
  });
}
window.uploadImage = uploadImage

drawingboard.draw()
size.forEach(function(child) {
  child.clickSize = clickSize
  child.addEventListener('touchstart', clickSize)
})

tool.forEach(function(child) {
  child.clicktool = clicktool
  child.addEventListener('touchstart', clicktool)
})

undo.saveHistory()
pencil.clicktool()
small.clickSize()

var vendors = ['ms', 'moz', 'webkit', 'o'];
for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
  window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
  window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
}

