var overlay = require('./overlay')
var TWEEN = require('tween.js')
function meteor(center, length, color){    
  this._center = center;    
  this._length = length;    
  this._color = color;    
}    

meteor.prototype = new overlay()

meteor.prototype.initialize = function(map) {
 this._map = map;        
 var div = document.createElement("div");    
 div.setAttribute('class', 'meteor_container')
 div.style.width = this._length + "px";    
 div.style.height = this._length + "px";    
 map.getPanes().markerPane.appendChild(div);      
 this._div = div
 this.addMeteor()
 return div;    
}

meteor.prototype.addMeteor = function() {
  var meteor = document.createElement('img')
  meteor.setAttribute('class', 'meteor_icon')
  meteor.setAttribute('src', '/imgs/meteor.png')
  this._div.appendChild(meteor)
}

meteor.prototype.moveMeteor = function(point) {
  var angle = getAngle(this._center, point)
  this._div.style.transform = "rotate("+ angle +"deg)"
  var tween = new TWEEN.Tween(this._center)
  console.log({point: point, center: this._center})
  var self = this
  tween.to(point, 4000)
  tween.onUpdate(function() {
    self.draw()
  })
  tween.start()
}

var getAngle = function(origin, tar) {
  var distanceX = tar.lat - origin.lat
  var distanceY = tar.lng - origin.lng
  console.log(distanceY / distanceX)
  var angle = Math.atan(distanceY / distanceX)
  console.log(angle / Math.PI * 180)
  return angle / Math.PI * 180 - 90
}
module.exports = meteor
