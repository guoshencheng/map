var TWEEN = require('tween.js')
var p = window.point;
var map = new AMap.Map("map_container"); 
map.on('complete', function() {
  drawline(getPoint(p))
})
map.setZoom(4)

function getPoint(point) {
  if (!point) return null
  var result = [point.lon, point.lat]
  if (point.nodes && point.nodes.length > 0) result.nodes = point.nodes
  return result
}

function drawline(point) {
  if (!point) return
  new AMap.Marker({
    map: map,
		position: point,
        icon: new AMap.Icon({            
            size: new AMap.Size(78, 78), 
            image: "/images/point.png",
            imageSize: new AMap.Size(10, 10),
            imageOffset: new AMap.Pixel(5, 25)
        })        
   });
  if (point.nodes && point.nodes.length > 0) {
    for (var index in point.nodes) {
      var child = point.nodes[index]
      if (child) {
        child = getPoint(child)
        animationDrawLine(point, child)
      }
    }
  }
}

function animationDrawLine(origin, tar) {
  var nodes = tar.nodes
  var originTar = [origin[0], origin[1]]
  var polyline = new AMap.Polyline({ map: map,
            path: [origin, originTar],
            strokeColor: 'red' ,
            strokeOpacity: 0.4,
            strokeWeight: 1, 
            strokeStyle: "solid"
        })
  var tween = new TWEEN.Tween(originTar)
  tween.easing(TWEEN.Easing.Quadratic.In);
  tween.to(tar, 800)
  tween.onUpdate(function () {
    polyline.setPath([origin, this])
  })
  tween.onComplete(function() {
    tar.nodes = nodes
    drawline(tar)
  })
  tween.start()
}

animate();
function animate() {
  requestAnimationFrame(animate);
  TWEEN.update()
}
