var TWEEN = require('tween.js')
var p = window.point;
var map = new AMap.Map("map_container"); 
var animationPoint= {}
var list
var list2
var pointLayer
var currentIndex = 0
clearMarks()
map.on('complete', function() {
  configureData(p)
  drawPoints()
  configurePoint()
  animationLine(list2[0], list2[1])
})
map.setZoom(4)

function drawPoints() {
  var mass = new AMap.MassMarks(list, {
     url: '/images/point.png',
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
  pointLayer = new AMap.MassMarks([{lnglat: start.lnglat}], {
     url: '/images/point.png',
     anchor: new AMap.Pixel(20, 20),
     size: new AMap.Size(40, 40),
     opacity:1,
     cursor:'pointer',
     zIndex: 2 
  });
  pointLayer.setMap(map)
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
            imageOffset: new AMap.Pixel(10, 10)
        })        
   });
  }
}

var animationLine = function(p1, p2) {
  var tween = new TWEEN.Tween(p1.lnglat)
  tween.to(p2.lnglat, 1500)
  tween.onUpdate(function () {
    pointLayer.setData([{lnglat: this}])
  })
  tween.onComplete(function() {
    currentIndex ++
    if (currentIndex < list2.length - 1) {
      animationLine(list2[currentIndex], list2[currentIndex + 1])
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

function configureData(p) {
  list = []
  list2 = []
  getArray(p)
  function getArray(p) {
    list.push({lnglat: [p.lon, p.lat]})
    list2.push({lnglat: [p.lon, p.lat]})
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

