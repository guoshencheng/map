/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/Users/guoshencheng/Documents/OtherProject/map/public/javascripts/dist";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var canvas = __webpack_require__(1)
	var undo = __webpack_require__(2)
	var drawingboard = __webpack_require__(5)(canvas)
	var image = __webpack_require__(4)
	var pencil = document.getElementById('pencil')
	var eraser = document.getElementById('eraser')
	var small = document.getElementById('small_size')
	var middle = document.getElementById('middle_size')
	var large = document.getElementById('large_size')
	var tool = [pencil, eraser]
	var size = [small, middle, large]
	var ajax = __webpack_require__(6)
	
	window.goback = undo.goBackInHistory
	window.gofront = undo.goForthInHistory
	window.clearCanvas = function() {
	  var ctx = canvas.context
	  ctx.clearRect(0, 0, canvas.width, canvas.height)
	  undo.saveHistory()
	}
	
	var setSizeOfElement = function(element) {
	  if (element == large) {
	    drawingboard.size = 10 
	  } else if (element == middle) {
	    drawingboard.size = 5
	  } else {
	    drawingboard.size = 1
	  }
	}
	
	var setColorOfElement = function(element) {
	  if (eraser == element) {
	    drawingboard.color = '#ffffff'
	  } else {
	    drawingboard.color = '#000000'
	  }
	}
	
	var clicktool = function() {
	  var current = this
	  setColorOfElement(current)
	  tool.forEach(function(child) {
	    if (child == current) {
	      child.style.backgroundColor = 'white'
	      child.style.color = 'black'
	    } else {
	      child.style.backgroundColor = 'black'
	      child.style.color = 'white'
	    }
	  })
	}
	
	var clickSize = function() {
	  var current = this
	  setSizeOfElement(current)
	  size.forEach(function(child) {
	    var icon = child.getElementsByClassName('size_icon')[0]
	    if (child == current) {
	      icon.style.backgroundColor = 'white'
	    } else {
	      icon.style.backgroundColor = 'black'
	    }
	  })
	}
	
	var uploadImage = function() {
	  var data = image.getImage()
	  var base64Data = data.substr(22)
	  ajax({
	      type: 'POST',
	      url: 'http://testry.renyan.cn/rest/share/draw/image',
	      data: JSON.stringify({image: base64Data}),
	      success: function (data) {
	        console.log(data)
	      }
	  });
	}
	window.uploadImage = uploadImage
	
	drawingboard.draw()
	size.forEach(function(child) {
	  child.clickSize = clickSize
	  child.addEventListener('touchstart', clickSize)
	})
	
	tool.forEach(function(child) {
	  child.clicktool = clicktool
	  child.addEventListener('touchstart', clicktool)
	})
	
	undo.saveHistory()
	pencil.clicktool()
	small.clickSize()


/***/ },
/* 1 */
/***/ function(module, exports) {

	var canvas = document.getElementById('drawingboard')
	
	var getContext = function() {
	  return canvas && canvas.getContext && canvas.getContext('2d') ? canvas.getContext('2d') : null;
	}
	var context = getContext()
	canvas.context = context
	canvas.on = function(event, cb) {
	  canvas.addEventListener(event, cb, false)
	}
	
	module.exports = canvas


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var SimpleUndo = __webpack_require__(3)
	var image = __webpack_require__(4)
	var history = new SimpleUndo({
	  maxLength: 10,
	  provider: function(done) {
	    done(image.getImage())
	  }
	})
	
	var saveHistory = function() {
	  history.save()
	}
	
	var goBackInHistory = function() {
	  history.undo(image.setImage)
	}
	
	var goForthInHistory = function() {
	  history.redo(image.setImage)
	}
	
	module.exports = {
	  saveHistory: saveHistory,
	  goBackInHistory: goBackInHistory,
	  goForthInHistory: goForthInHistory
	}
	


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	(function() {
		
	'use strict';
	
	/**
	 * SimpleUndo is a very basic javascript undo/redo stack for managing histories of basically anything.
	 * 
	 * options are: {
	 * 	* `provider` : required. a function to call on `save`, which should provide the current state of the historized object through the given "done" callback
	 * 	* `maxLength` : the maximum number of items in history
	 * 	* `opUpdate` : a function to call to notify of changes in history. Will be called on `save`, `undo`, `redo` and `clear`
	 * }
	 * 
	 */
	var SimpleUndo = function(options) {
		
		var settings = options ? options : {};
		var defaultOptions = {
			provider: function() {
				throw new Error("No provider!");
			},
			maxLength: 30,
			onUpdate: function() {}
		};
		
		this.provider = (typeof settings.provider != 'undefined') ? settings.provider : defaultOptions.provider;
		this.maxLength = (typeof settings.maxLength != 'undefined') ? settings.maxLength : defaultOptions.maxLength;
		this.onUpdate = (typeof settings.onUpdate != 'undefined') ? settings.onUpdate : defaultOptions.onUpdate;
		
		this.initialItem = null;
		this.clear();
	};
	
	function truncate (stack, limit) {
		while (stack.length > limit) {
			stack.shift();
		}
	}
	
	SimpleUndo.prototype.initialize = function(initialItem) {
		this.stack[0] = initialItem;
		this.initialItem = initialItem;
	};
	
	
	SimpleUndo.prototype.clear = function() {
		this.stack = [this.initialItem];
		this.position = 0;
		this.onUpdate();
	};
	
	SimpleUndo.prototype.save = function() {
		this.provider(function(current) {
			truncate(this.stack, this.maxLength);
			this.position = Math.min(this.position,this.stack.length - 1);
			
			this.stack = this.stack.slice(0, this.position + 1);
			this.stack.push(current);
			this.position++;
			this.onUpdate();
		}.bind(this));
	};
	
	SimpleUndo.prototype.undo = function(callback) {
		if (this.canUndo()) {
			var item =  this.stack[--this.position];
			this.onUpdate();
			
			if (callback) {
				callback(item);
			}
		}
	};
	
	SimpleUndo.prototype.redo = function(callback) {
		if (this.canRedo()) {
			var item = this.stack[++this.position];
			this.onUpdate();
			
			if (callback) {
				callback(item);
			}
		}
	};
	
	SimpleUndo.prototype.canUndo = function() {
		return this.position > 0;
	};
	
	SimpleUndo.prototype.canRedo = function() {
		return this.position < this.count();
	};
	
	SimpleUndo.prototype.count = function() {
		return this.stack.length - 1; // -1 because of initial item
	};
	
	
	
	
	
	//exports
	// node module
	if (true) {
		module.exports = SimpleUndo;
	}
	
	// browser global
	if (typeof window != 'undefined') {
		window.SimpleUndo = SimpleUndo;
	}
	
	})();

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var canvas = __webpack_require__(1)
	
	var getImage = function() {
	  return canvas.toDataURL('image/png')
	}
	
	var setImage = function(src) {
	  if (!src) return
	  var ctx = canvas.context
	  var img = new Image()
	  var oldGCO = ctx.globalCompositeOperation
	  img.onload = function() {
	    ctx.globalCompositeOperation = "source-over"
	    ctx.clearRect(0, 0, canvas.width, canvas.height)
	    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
	    ctx.globalCompositeOperation = oldGCO
	  }
	  img.src = src
	}
	
	module.exports = {
	  getImage: getImage,
	  setImage: setImage
	}
	


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var undo = __webpack_require__(2)
	module.exports = function(canvas) {
	  var drawingboard = {}
	  
	  drawingboard.canvas = canvas
	  drawingboard.coords = {}
	  drawingboard.drawing = false
	  drawingboard.size = 1 
	  drawingboard.color = '#000000'
	  
	  drawingboard.getInputCoords = function(e) {
	    e = e.originalEvent ? e.originalEvent : e
	    var rect = canvas.getBoundingClientRect()
	    var width = canvas.width
	    var height = canvas.height
	    var x, y
	    if (e.touches && e.touches.length == 1) {
	      x = e.touches[0].pageX
	      y = e.touches[0].pageY   
	    } else {
	      x = e.pageX
	      y = e.pageY
	    }
	    x = x - canvas.offsetLeft
	    y = y - canvas.offsetTop
	    x *= (width / rect.width)
	    y *= (height / rect.height)
	    return {x: x, y: y}
	  }
	
	  drawingboard.getMidInputCoords = function(coords) {
	    return {
	      x: drawingboard.coords.old.x + coords.x >> 1,
	      y: drawingboard.coords.old.y + coords.y >> 1
	    }
	  }
	
	  drawingboard.draw = function() {
	    if (drawingboard.drawing) {
	      var ctx = canvas.context
	      ctx.lineWidth = drawingboard.size
	      ctx.strokeStyle = drawingboard.color
	      var currentMid = drawingboard.getMidInputCoords(drawingboard.coords.current)
	      ctx.beginPath()
	      ctx.strokeStyle = drawingboard.color
	      ctx.moveTo(currentMid.x, currentMid.y)
	      ctx.quadraticCurveTo(drawingboard.coords.old.x, drawingboard.coords.old.y, drawingboard.coords.oldMid.x, drawingboard.coords.oldMid.y);
	      ctx.stroke();
	      drawingboard.coords.old = drawingboard.coords.current;
	      drawingboard.coords.oldMid = currentMid;
	  }
	  if (requestAnimationFrame) requestAnimationFrame(drawingboard.draw)
	  }
	  
	  canvas.on('touchstart', function(e) {
	    onTouchStart(e, drawingboard.getInputCoords(e))
	  })
	
	  canvas.on('touchmove', function(e) {
	    onTouchMove(e, drawingboard.getInputCoords(e))
	  })
	
	  canvas.on('touchend', function(e) {
	    onTouchStop(e, drawingboard.getInputCoords(e))
	  })
	  
	  var onTouchStart = function(e, coords) {
	    drawingboard.coords.current = drawingboard.coords.old = coords
	    drawingboard.coords.oldMid = drawingboard.getMidInputCoords(coords)
	    drawingboard.drawing = true
	    if (!requestAnimationFrame) drawingboard.draw()
	    e.stopPropagation()
	    e.preventDefault()
	  }
	
	  var onTouchMove = function(e, coords) {
	    drawingboard.coords.current = coords
	    if (!requestAnimationFrame) drawingboard.draw()
	    e.stopPropagation()
	    e.preventDefault()
	  }
	
	  var onTouchStop = function(e, coords) {
	    if (drawingboard.drawing && (!e.touches || e.touches.length === 0)) {
	      drawingboard.drawing = false
	      undo.saveHistory()
	      e.stopPropagation()
	      e.preventDefault()
	    }
	  }
	  return drawingboard
	}


/***/ },
/* 6 */
/***/ function(module, exports) {

	var ajax = function (cfg) {
	    var type = cfg.type;
	    var url = cfg.url;
	    var data = cfg.data;
	    var success = cfg.success;
	
	    var xhr = new XMLHttpRequest();
	    xhr.onloadend = function () {
	        if (XMLHttpRequest.DONE == this.readyState && this.status == 200) {
	            var data = JSON.parse(xhr.responseText);
	            if (data.errMsg) {
	                console.log(data.errMsg);
	            } else {
	                success(data);
	            }
	        } else {
	            console.log('网络异常，请稍后再试。');
	        }
	    };
	    xhr.ontimeout = onerror;
	    xhr.open(type, url, true);
	    xhr.setRequestHeader('accept', 'application/json');
	    if (type.toUpperCase() == 'POST') {
	        xhr.setRequestHeader('Content-Type', 'application/json;charset=utf-8');
	        xhr.setRequestHeader('contentType', 'application/json;charset=utf-8');
	        xhr.send(data);
	    } else {
	        xhr.send(null);
	    }
	};
	
	module.exports = ajax


/***/ }
/******/ ]);
//# sourceMappingURL=drawingboard.js.map