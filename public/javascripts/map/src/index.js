var TWEEN = require('tween.js')
var p = window.point;
var map = new AMap.Map("map_container"); 
clearMarks()
map.on('complete', function() {
  drawAllPoint(p)
  // drawPoint(p)
  // drawline(p, callBack)
})
map.setZoom(4)

var drawAllPoint = function(point) {
  drawPoint(point)
  for (var index in point.nodes) {
    drawAllPoint(point.nodes[index])
  }
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
            size: new AMap.Size(78, 78), 
            image: "/images/point.png",
            imageSize: new AMap.Size(10, 10),
            imageOffset: new AMap.Pixel(5, 25)
        })        
   });
}

var callBack = function(node) {
  if (node && node.nodes && node.nodes.length - 1 > node.currentIndex) {
    var current = (node.nodes[node.currentIndex])
    node.currentIndex ++
    if (current.nodes) {
      drawline(current, callBack)
    } else {
      callBack(node)
    }
  } else {
    if (node.parent) {
      callBack(node.parent)
    }
  }
}

function drawline(point, cb) {
  if (!point) return
  if (point.nodes && point.nodes.length > 0) {
    point.currentIndex = 0
    for (var index = 0; index < point.nodes.length; index++) {
      var child = point.nodes[index]
      if (child) {
        child.parent = point
        index === 0 ? animationDrawLine(point, child, cb) : animationDrawLine(point, child)
      }
    }
  } 
}

function animationDrawLine(origin, tar, cb) {
  var parent = tar.parent
  var nodes = tar.nodes
  var originTar = [origin.lon, origin.lat]
  var polyline = new AMap.Polyline({ map: map,
            path: [[origin.lon, origin.lat], originTar],
            strokeColor: 'red' ,
            strokeOpacity: 0.4,
            strokeWeight: 1, 
            strokeStyle: "solid"
        })
  var tween = new TWEEN.Tween(originTar)
  tween.easing(TWEEN.Easing.Quartic.In);
  tween.to([tar.lon, tar.lat], 1500)
  tween.onUpdate(function () {
    polyline.setPath([[origin.lon, origin.lat], this])
  })
  tween.onComplete(function() {
    drawPoint(tar)
    if (cb) {
      cb(tar)
    }
  })
  tween.start()
}

animate();
function animate() {
  requestAnimationFrame(animate);
  TWEEN.update()
}
