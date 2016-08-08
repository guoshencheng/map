
var utils = require('../utils')
var microevent = require('microevent')
var canvas = require('./canvas')
var undo = require('./undo')
var drawingboard = require('./drawingboard')(canvas)
drawingboard.draw()

window.goback = undo.goBackInHistory
window.gofont = undo.goForthInHistory
window.clearCanvas = function() {
  var ctx = canvas.context
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  undo.saveHistory()
}

undo.saveHistory()

var pencil = document.getElementById('pencil')
var eraser = document.getElementById('eraser')
var small = document.getElementById('small_size')
var middle = document.getElementById('middle_size')
var large = document.getElementById('large_size')
var tool = [pencil, eraser]
var size = [small, middle, large]

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
    drawingboard.color = '#ffffff'
  } else {
    drawingboard.color = '#000000'
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

size.forEach(function(child) {
  child.clickSize = clickSize
  child.addEventListener('touchstart', clickSize)
})

tool.forEach(function(child) {
  child.clicktool = clicktool
  child.addEventListener('touchstart', clicktool)
})

pencil.clicktool()
small.clickSize()
