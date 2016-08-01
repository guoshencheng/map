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

	var p = window.point;
	var map = new AMap.Map("map_container"); 
	if (p) {
	  map.setCenter([p.lon, p.lat])
	}
	
	var list, list2, animation
	var currentIndex = 0
	var renyanContentShare = JSON.parse(localStorage.renyanContentShare)
	clearMarks()
	map.on('complete', function() {
	  configureData(p)
	  drawPoints()
	  configurePoint()
	  animationLine()
	})
	map.setZoom(5)
	var configure = __webpack_require__(1)
	configure()
	
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
	  var userCountText = document.getElementById('friend_push_count')
	  var viewCountText = document.getElementById('view_push_count')
	  if (userCountText && viewCountText) {
	    userCountText.textContent = (viewed / added) + 1
	    viewCountText.style.color = '#FF3F3F'
	  }
	  textAnimation.beginValue = viewed
	  textAnimation.endValue = viewed + added
	  textAnimation.start()
	}
	
	var textAnimation = {}
	textAnimation.running = false
	textAnimation.beginValue = 0
	textAnimation.endValue = 0
	textAnimation.progress = 0
	textAnimation.caculateCurrent = function () {
	  return (this.endValue - this.beginValue) * this.progress + this.beginValue
	}
	textAnimation.start = function() {
	  this.progress = 0
	  this.running = true 
	}
	
	textAnimation.stop = function() {
	  this.running = false
	}
	
	textAnimation.continue = function() {
	  if (this.progress < 0) {
	    this.running = true
	  }
	}
	
	textAnimation.update = function() {
	  if (this.running) {
	    textAnimation.progress += 0.02
	    var current = textAnimation.caculateCurrent().toFixed(0)
	    var fontSize = (14 + 14 * getBounzeValue(textAnimation.progress))
	    var userCountText = document.getElementById('friend_push_count')
	    var viewCountText = document.getElementById('view_push_count')
	    if (userCountText && viewCountText) {
	      viewCountText.textContent = current
	      viewCountText.style.fontSize = fontSize + 'px'
	    }
	    if (textAnimation.progress >= 1) {
	      this.running = false
	    }
	  }
	}
	
	function getBounzeValue(value) {
	  return -4 * (value - 0.5) * (value - 0.5) + 1
	}
	
	animate();
	function animate() {
	  textAnimation.update()
	  requestAnimationFrame(animate);
	}
	


/***/ },
/* 1 */
/***/ function(module, exports) {

	
	var configure = function() {
	  window.clickSpreadButton = function() {
	    if (!renyanContentShare[spreadParams.cid]) {
	      var spread = document.getElementById('spread_button')
	      Ajax('http://app.ry.api.renyan.cn/rest/share/spread/' + spreadParams.cid).post({a: 1}).done(function(result) {
	      if (result == 'success') {
	        renyanContentShare[spreadParams.cid] = true;
	        localStorage.renyanContentShare = JSON.stringify(renyanContentShare)
	        setSpeadCount(spreadParams.viewed, spreadParams.added)
	        spread.style.backgroundImage = "url('http://7xpecj.com1.z0.glb.clouddn.com/spreaded_button_icon.png')"
	        }
	      })
	    } else {
	      console.log('has sended')
	    }
	  }
	  configureSpreadButton()
	  hideShareButton()
	}
	
	
	
	function configureSpreadButton() {
	  var spread = document.getElementById('spread_button')
	  if (!spread) return
	  if (!renyanContentShare[spreadParams.cid]) {
	    spread.style.backgroundImage = "url('http://7xpecj.com1.z0.glb.clouddn.com/spread_button_icon.png')"
	  } else {
	    spread.style.backgroundImage = "url('http://7xpecj.com1.z0.glb.clouddn.com/spreaded_button_icon.png')"
	  }
	}
	
	function hideShareButton() {
	  if (!(window.webkit && webkit.messageHandlers && webkit.messageHandlers.share && webkit.messageHandlers.share.postMessage) && !(window.android && android.share)) {
	    var button = document.getElementById('share_button')
	    if (button) {
	      button.style.display = 'none'
	    }
	  }
	}
	
	module.exports = configure


/***/ }
/******/ ]);
//# sourceMappingURL=dist.js.map