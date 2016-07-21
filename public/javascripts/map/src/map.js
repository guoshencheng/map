var TWEEN = require('tween.js')
var p = window.point;
var map = new AMap.Map("map_container"); 
var list, list2, animation
var currentIndex = 0
clearMarks()
map.on('complete', function() {
  configureData(p)
  drawPoints()
  configurePoint()
  animationLine()
})
map.setZoom(5)

function drawPoints() {
  var mass = new AMap.MassMarks(list, {
     url: 'http://7xpecj.com1.z0.glb.clouddn.com/2/point.png',
     anchor: new AMap.Pixel(10, 10),
     size: new AMap.Size(20, 20),
     opacity:1,
     cursor:'pointer',
     zIndex: 1
  });
  mass.setMap(map)
}

function configurePoint() {
  var start = list2[0]
  animation = new AMap.Marker({
    map: map,
    position: start,
    icon: "http://7xpecj.com1.z0.glb.clouddn.com/6/fire_ball.png",
    offset: new AMap.Pixel(-40, -20),
    autoRotation: true
  });
}

var animationLine = function() {
  animation.moveAlong(list2, 600000);
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

function configureData(p) {
  list = []
  list2 = []
  getArray(p)
  function getArray(p) {
    list.push({lnglat: [p.lon, p.lat]})
    list2.push(new AMap.LngLat(p.lon, p.lat))
    if (p.nodes && p.nodes.length > 0) {
      p.nodes.forEach(function(node) {
        getArray(node)
      })
    }
  }
}

animate();
function animate() {
  requestAnimationFrame(animate);
  TWEEN.update()
}

