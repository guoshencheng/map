var TWEEN = require('tween.js')
var p = window.point;
var map = new AMap.Map("map_container"); 
var canvas = require('./canvas')(map)
canvas.addIcon()
var animationPoint= {}
var lines = []
var currentIndex = 0
clearMarks()
map.on('complete', function() {
  generateAnimationPoint()
  drawAllPoint(p)
  lines = []
  currentIndex = 0
  generateLines(p)
  animationLine(lines[currentIndex])
})
map.setZoom(4)

var drawAllPoint = function(point) {
  drawPoint(point)
  for (var index in point.nodes) {
    drawAllPoint(point.nodes[index])
  }
}

var generateAnimationPoint = function() {
  if (p) {
    animationPoint = new AMap.Marker({
    map: map,
		position: [p.lon, p.lat],
        icon: new AMap.Icon({            
            size: new AMap.Size(20, 20), 
            image: "/images/point.png",
            imageSize: new AMap.Size(20, 20),
            imageOffset: new AMap.Pixel(0, 0)
        })        
   });
  }
}

var animationLine = function(line) {
  var p1 = line[0]
  var p2 = line[1]
  var tween = new TWEEN.Tween(p1)
  tween.to(p2, 1500)
  tween.onUpdate(function () {
    animationPoint.setPosition(new AMap.LngLat(this[0], this[1]))
  })
  tween.onComplete(function() {
    currentIndex ++
    if (currentIndex < lines.length) {
      animationLine(lines[currentIndex])
    }
  })
  tween.start()
}

function clearMarks() {
  var mark = document.getElementsByClassName('amap-logo')[0]
  if (mark && mark.parentElement) {
    mark.parentElement.removeChild(mark)
  }
  var copyright = document.getElementsByClassName('amap-copyright')[0]
  if (copyright && copyright.parentElement) {
    copyright.parentElement.removeChild(copyright)
  }
}

function drawPoint(point) {
  if (!point) return
  new AMap.Marker({
    map: map,
		position: [point.lon, point.lat],
        icon: new AMap.Icon({            
            size: new AMap.Size(15, 15), 
            image: "/images/point.png",
            imageSize: new AMap.Size(15, 15),
            imageOffset: new AMap.Pixel(0, 0)
        })        
   });
}

var generateLines = function(point) {
  if (point.nodes && point.nodes.length) {
    point.nodes.forEach(function(node, key) {
      lines.push([[point.lon, point.lat], [node.lon, node.lat]])
      generateLines(node)
    })
  }
}

animate();
function animate() {
  requestAnimationFrame(animate);
  TWEEN.update()
}

