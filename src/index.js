var TWEEN = require('tween.js')
var pointOverlay= require('./pointOverlay')
var meteorOverlay = require('./meteorOverlay')

var p1 = new BMap.Point(116.399, 39.910)
var p2 = new BMap.Point(121.43333, 34.50000)
var points1 = [
  p2,
  new BMap.Point(120.20000, 32.266667)
]
var points2 = [new BMap.Point(113.23333, 23.16667),
 new BMap.Point(113.51667, 22.30000)]
p1.children = points1
p2.children = points2
var map = new BMap.Map("container"); 
var point = new BMap.Point(116.399, 39.910)
map.centerAndZoom(point, 5); 
drawline(p1)


function drawline(point) {
  var square = new pointOverlay(point, 5, 'red')
  map.addOverlay(square)
  if (point.children && point.children.length > 0) {
    for (var index in point.children) {
      var child = point.children[index]
      if (child) {
        animationDrawLine(point, child)
      }
    }
  }
}

function animationDrawLine(origin, tar) {
  var children = tar.children
  var originTar = new BMap.Point(origin.lng, origin.lat)
  var polyline = new BMap.Polyline([origin, originTar], {strokeColor:"red", strokeWeight:1, strokeOpacity:0.3})
  map.addOverlay(polyline)
  var tween = new TWEEN.Tween(polyline.ia[1])
  tween.to(tar, 1000)
  tween.onUpdate(function (progress) {
    polyline.draw()
  })
  tween.onComplete(function() {
    tar.children = children
    drawline(tar)
  })
  tween.start()
}

animate();
function animate() {
    requestAnimationFrame(animate);
    TWEEN.update();
}
