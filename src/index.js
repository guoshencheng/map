var TWEEN = require('tween.js')
var p1 = [116.399, 39.910]
var p2 = [121.43333, 34.50000]
var points1 = [
  p2,
  [120.20000, 32.266667]
]
var points2 = [[113.23333, 23.16667],
 [113.51667, 22.30000]]
p1.children = points1
p2.children = points2

var map = new AMap.Map("container"); 
map.on('complete', function() {
  drawline(p1)
})
map.setZoom(5)

function drawline(point) {
  new AMap.Marker({
    map: map,
		position: point,
        icon: new AMap.Icon({            
            size: new AMap.Size(78, 78), 
            image: "/imgs/point.png",
            imageSize: new AMap.Size(20, 20),
            imageOffset: new AMap.Pixel(0, 20)
        })        
    });
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
  var originTar = [origin[0], origin[1]]
  var polyline = new AMap.Polyline({ map: map,
            path: [origin, originTar],
            strokeColor: 'red' ,
            strokeOpacity: 0.3,
            strokeWeight: 1, 
            strokeStyle: "solid"//线样式
        })
  var tween = new TWEEN.Tween(originTar)
  tween.to(tar, 1000)
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
