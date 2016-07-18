var canvas = document.createElement('canvas')

canvas.addIcon = function() {
  var beauty = new Image();  
  beauty.src = "http://localhost:8092/images/point.png"
  if(beauty.complete){
    drawBeauty(beauty)
  }else{
    beauty.onload = function(){
      drawBeauty(beauty)
    }
    beauty.onerror = function(){
    }
  }
}

canvas.drawPoints = function (p) {
   
}



function drawBeauty(beauty){
  var myctx = canvas.getContext("2d");
  myctx.drawImage(beauty, 20, 20, 20, 20);
}

module.exports = function(map) {
  canvas.width = map.getSize().width
  canvas.height = map.getSize().height
  var layer = new AMap.CustomLayer(canvas, {
			zooms: [3, 8],
			zIndex: 12
  })
  layer.setMap(map)
  return canvas
}

