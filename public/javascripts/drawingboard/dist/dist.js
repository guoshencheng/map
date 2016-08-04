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
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var utils = __webpack_require__(1)
	var microevent = __webpack_require__(2)
	var SimpleUndo = __webpack_require__(4)
	
	var canvas = document.getElementById('drawingboard')
	var color, 
	  fillTolerance = 100,
	  size = 1
	var data = {}
	data.coords = {}
	data.drawing = false
	color = '#000000'
	
	var draw = function() {
	  if (data.isDrawing) {
	    var ctx = getContext()
	    var currentMid = getMidInputCoords(data.coords.current)
	    ctx.beginPath()
	    ctx.strokeStyle = color
	    ctx.moveTo(currentMid.x, currentMid.y)
	    ctx.quadraticCurveTo(data.coords.old.x, data.coords.old.y, data.coords.oldMid.x, data.coords.oldMid.y);
		  ctx.stroke();
		  data.coords.old = data.coords.current;
			data.coords.oldMid = currentMid;
	  }
	  if (requestAnimationFrame) requestAnimationFrame(draw)
	}
	
	draw()
	
	canvas.on = function(event, cb) {
	  canvas.addEventListener(event, cb, false)
	}
	
	canvas.on('touchstart', function(e) {
	  onTouchStart(e, getInputCoords(e))
	})
	
	canvas.on('touchmove', function(e) {
	  onTouchMove(e, getInputCoords(e))
	})
	
	canvas.on('touchend', function(e) {
	  onTouchStop(e, getInputCoords(e))
	})
	
	var onTouchStart = function(e, coords) {
	  data.coords.current = data.coords.old = coords
	  data.coords.oldMid = getMidInputCoords(coords)
	  data.isDrawing = true
	  if (!requestAnimationFrame) draw()
	  e.stopPropagation()
	  e.preventDefault()
	}
	
	var onTouchMove = function(e, coords) {
	  data.coords.current = coords
	  if (!requestAnimationFrame) draw()
	  e.stopPropagation()
	  e.preventDefault()
	}
	
	var onTouchStop = function(e, coords) {
	  if (data.isDrawing && (!e.touches || e.touches.length === 0)) {
	    data,isDrawing = false
	    saveHistory()
	    e.stopPropagation()
	    e.preventDefault()
	  }
	}
	
	var getInputCoords = function(e) {
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
	
	var getMidInputCoords = function(coords) {
	  return {
	    x: data.coords.old.x + coords.x >> 1,
	    y: data.coords.old.y + coords.y >> 1
	  }
	}
	
	/**
	 *  init history with simple-undo
	 **/
	var history = new SimpleUndo({
	  maxLength: 20,
	  provider: function(done) {
	    done(getImage())
	  }
	})
	
	var saveHistory = function() {
	  history.save()
	}
	
	var goBackInHistory = function() {
	  history.undo(setImage)
	}
	
	var goForthInHistory = function() {
	  history.redo(setImage)
	}
	
	window.goback = goBackInHistory
	window.gofont = goForthInHistory
	
	var getImage = function() {
	  return canvas.toDataURL('image/png')
	}
	
	var setImage = function(src) {
	  var ctx = getContext()
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
	
	var getContext = function() {
	  return canvas && canvas.getContext && canvas.getContext('2d') ? canvas.getContext('2d') : null;
	}
	
	saveHistory()
	  
	
	


/***/ },
/* 1 */
/***/ function(module, exports) {

	
	var isColor = function(string) {
		if (!string || !string.length) return false;
		return (/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i).test(string) || $.inArray(string.substring(0, 3), ['rgb', 'hsl']) !== -1;
	};
	
	/**
	 * Packs an RGB color into a single integer.
	 */
	var RGBToInt = function(r, g, b) {
		var c = 0;
		c |= (r & 255) << 16;
		c |= (g & 255) << 8;
		c |= (b & 255);
		return c;
	};
	
	/**
	 * Returns informations on the pixel located at (x,y).
	 */
	var pixelAt = function(image, x, y) {
		var i = (y * image.width + x) * 4;
		var c = DrawingBoard.Utils.RGBToInt(
			image.data[i],
			image.data[i + 1],
			image.data[i + 2]
		);
	
		return [
			i, // INDEX
			x, // X
			y, // Y
			c  // COLOR
		];
	};
	
	/**
	 * Compares two colors with the given tolerance (between 0 and 255).
	 */
	var compareColors = function(a, b, tolerance) {
		if (tolerance === 0) {
			return (a === b);
		}
	
		var ra = (a >> 16) & 255, rb = (b >> 16) & 255,
			ga = (a >> 8) & 255, gb = (b >> 8) & 255,
			ba = a & 255, bb = b & 255;
	
		return (Math.abs(ra - rb) <= tolerance)
			&& (Math.abs(ga - gb) <= tolerance)
			&& (Math.abs(ba - bb) <= tolerance);
	};
	
	(function() {
		var lastTime = 0;
		var vendors = ['ms', 'moz', 'webkit', 'o'];
		for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
			window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
			window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
		}
	}());
	
	module.exports = {
	  isColor: isColor,
	  RGBToInt: RGBToInt,
	  pixelAt: pixelAt,
	  compareColors: compareColors
	}


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {/**
	 * MicroEvent - to make any js object an event emitter (server or browser)
	 * 
	 * - pure javascript - server compatible, browser compatible
	 * - dont rely on the browser doms
	 * - super simple - you get it immediatly, no mistery, no magic involved
	 *
	 * - create a MicroEventDebug with goodies to debug
	 *   - make it safer to use
	*/
	
	var MicroEvent	= function(){}
	MicroEvent.prototype	= {
		bind	: function(event, fct){
			this._events = this._events || {};
			this._events[event] = this._events[event]	|| [];
			this._events[event].push(fct);
		},
		unbind	: function(event, fct){
			this._events = this._events || {};
			if( event in this._events === false  )	return;
			this._events[event].splice(this._events[event].indexOf(fct), 1);
		},
		trigger	: function(event /* , args... */){
			this._events = this._events || {};
			if( event in this._events === false  )	return;
			for(var i = 0; i < this._events[event].length; i++){
				this._events[event][i].apply(this, Array.prototype.slice.call(arguments, 1))
			}
		}
	};
	
	/**
	 * mixin will delegate all MicroEvent.js function in the destination object
	 *
	 * - require('MicroEvent').mixin(Foobar) will make Foobar able to use MicroEvent
	 *
	 * @param {Object} the object which will support MicroEvent
	*/
	MicroEvent.mixin	= function(destObject){
		var props	= ['bind', 'unbind', 'trigger'];
		for(var i = 0; i < props.length; i ++){
			destObject.prototype[props[i]]	= MicroEvent.prototype[props[i]];
		}
	}
	
	// export in common js
	if( typeof module !== "undefined" && ('exports' in module)){
		module.exports	= MicroEvent
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)(module)))

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 4 */
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

/***/ }
/******/ ]);
//# sourceMappingURL=dist.js.map