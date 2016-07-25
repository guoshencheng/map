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
/***/ function(module, exports) {

	var p = window.point;
	var map = new AMap.Map("map_container"); 
	if (p) {
	  map.setCenter([p.lon, p.lat])
	}
	var list, list2, animation
	var currentIndex = 0
	clearMarks()
	map.on('complete', function() {
	  configureData(p)
	  drawPoints()
	  configurePoint()
	  animationLine()
	})
	map.setZoom(5)
	
	if (!window.webkit || !webkit.messageHandlers && webkit.messageHandlers.share && webkit.messageHandlers.share.postMessage) {
	  var button = document.getElementById('share_button')
	  if (button) {
	    button.style.display = 'none'
	  }
	}
	
	function drawPoints() {
	  var mass = new AMap.MassMarks(list, {
	     url: 'http://7xpecj.com1.z0.glb.clouddn.com/2/point.png',
	     anchor: new AMap.Pixel(10, 10),
	     size: new AMap.Size(20, 20),
	     opacity:1,
	     cursor:'pointer',
	     zIndex: 1
	  });
	  mass.setMap(map)
	}
	
	function configurePoint() {
	  var start = list2[0]
	  animation = new AMap.Marker({
	    map: map,
	    position: start,
	    icon: "http://7xpecj.com1.z0.glb.clouddn.com/6/fire_ball.png",
	    offset: new AMap.Pixel(-40, -20),
	    autoRotation: true
	  });
	}
	
	var animationLine = function() {
	  animation.moveAlong(list2, 600000, function(k){return k}, true);
	}
	
	function clearMarks() {
	  var mark = document.getElementsByClassName('amap-logo')[0]
	  if (mark && mark.parentElement) {
	    mark.parentElement.removeChild(mark)
	  }
	  var copyright = document.getElementsByClassName('amap-copyright')[0]
	  if (copyright && copyright.parentElement) {
	    copyright.parentElement.removeChild(copyright)
	  }
	}
	
	function configureData(p) {
	  list = []
	  list2 = []
	  getArray(p)
	  function getArray(p) {
	    list.push({lnglat: [p.lon, p.lat]})
	    list2.push(new AMap.LngLat(p.lon, p.lat))
	    if (p.nodes && p.nodes.length > 0) {
	      p.nodes.forEach(function(node) {
	        getArray(node)
	      })
	    }
	  }
	}
	
	window.setSpeadCount = function(viewed, added){
	  textAnimation.beginValue = viewed
	  textAnimation.endValue = viewed + added
	  textAnimation.start()
	}
	
	var textAnimation = {}
	textAnimation.timer = 0
	textAnimation.running = false
	textAnimation.beginValue = 0
	textAnimation.currentValue = 0
	textAnimation.endValue = 0
	textAnimation.start = function() {
	  this.currentValue = textAnimation.beginValue
	  this.timer = 0 
	  this.running = true 
	}
	
	textAnimation.stop = function() {
	  this.running = false
	}
	
	textAnimation.continue = function() {
	  if (this.currentValue < this.endValue) {
	    this.running = true
	  }
	}
	
	textAnimation.update = function() {
	  if (this.running) {
	    this.timer ++
	  }
	  if (this.timer % 8 === 0 && this.running) {
	    textAnimation.currentValue ++
	    var text = document.getElementById('spread_text')
	    if (text) {
	      text.textContent = '增加浏览数 ' + textAnimation.currentValue
	    }
	    if (textAnimation.currentValue >= textAnimation.endValue) {
	      this.running = false
	    }
	  }
	}
	
	animate();
	function animate() {
	  textAnimation.update()
	  requestAnimationFrame(animate);
	}
	


/***/ }
/******/ ]);
//# sourceMappingURL=dist.js.map