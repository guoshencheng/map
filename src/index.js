var TWEEN = require('tween.js')
var p1 = [116.399, 39.910]
var p2 = [121.43333, 34.50000]
var p3 = [115.55, 28.4]
var points1 = [
  p2,
  [120.20000, 32.266667],
]

var points3 = [[123.25, 41.48], [111.41, 40.48], [101.48, 36.38]]
var points2 = [[113.23333, 23.16667],
 [113.51667, 22.30000], p3]
p1.children = points1
p2.children = points2
p3.children = points3

var map = new AMap.Map("map_container"); 
map.on('complete', function() {
  drawline(p1)
})
map.setZoom(4)

function drawline(point) {
  new AMap.Marker({
    map: map,
		position: point,
        icon: new AMap.Icon({            
            size: new AMap.Size(78, 78), 
            image: "/imgs/point.png",
            imageSize: new AMap.Size(10, 10),
            imageOffset: new AMap.Pixel(5, 25)
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
            strokeOpacity: 0.4,
            strokeWeight: 1, 
            strokeStyle: "solid"
        })
  var tween = new TWEEN.Tween(originTar)
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
