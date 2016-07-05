var overlay = require('./overlay')
function pointOverlay(center, length, color){    
  this._center = center;    
  this._length = length;    
  this._color = color;    
}    

pointOverlay.prototype = new overlay()

pointOverlay.prototype.initialize = function(map) {
 this._map = map;        
 var div = document.createElement("div");    
 div.setAttribute('class', 'location_circle')
 div.style.width = this._length + "px";    
 div.style.height = this._length + "px";    
 div.style.background = this._color;      
 map.getPanes().markerPane.appendChild(div);      
 this._div = div;      
 return div;    
}

module.exports = pointOverlay
