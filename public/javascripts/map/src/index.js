var TWEEN = require('tween.js')
var p = window.point;
var map = new AMap.Map("map_container"); 
map.on('complete', function() {
  drawline(getPoint(p))
})
map.setZoom(4)

function getPoint(point) {
  var result = [point.lng, point.lat]
  if (point.children) result.children = point.children
  return result
}

function drawline(point) {
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
  if (point.children && point.children.length > 0) {
    for (var index in point.children) {
      var child = point.children[index]
      if (child) {
        child = getPoint(child)
        animationDrawLine(point, child)
      }
    }
  }
}

function animationDrawLine(origin, tar) {
  var children = tar.children
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
    tar.children = children
    drawline(tar)
  })
  tween.start()
}

animate();
function animate() {
  requestAnimationFrame(animate);
  TWEEN.update()
}
