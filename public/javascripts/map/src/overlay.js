function Overlay(){    
}    

Overlay.prototype = new BMap.Overlay();

Overlay.prototype.draw = function(){    
  var position = this._map.pointToOverlayPixel(this._center);    
  this._div.style.left = position.x - this._length / 2 + "px";    
  this._div.style.top = position.y - this._length / 2 + "px";    
}

Overlay.prototype.show = function(){    
  if (this._div){    
   this._div.style.display = "";    
  }    
}      

Overlay.prototype.hide = function(){    
  if (this._div){    
    this._div.style.display = "none";    
  }    
}


module.exports = Overlay

