var TWEEN = require('tween.js')
var p = window.point;
var map = new AMap.Map("map_container"); 
var animationPoint= {}
var lines = []
var currentIndex = 0
clearMarks()
map.on('complete', function() {
  var list = pointArrary(p)
  var mass = new AMap.MassMarks(list, {
     url: '/images/point.png',
     anchor: new AMap.Pixel(10, 10),
     size: new AMap.Size(20, 20),
     opacity:1,
     cursor:'pointer',
     zIndex: 1
  });
  mass.setMap(map)
})
map.setZoom(4)

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

function pointArrary(p) {
  var points = []
  getArray(p)
  function getArray(p) {
    points.push({lnglat: [p.lon, p.lat]})
    if (p.nodes && p.nodes.length > 0) {
      p.nodes.forEach(function(node) {
        getArray(node)
      })
    }
  }
  return points
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

