!function(modules){function __webpack_require__(moduleId){if(installedModules[moduleId])return installedModules[moduleId].exports;var module=installedModules[moduleId]={exports:{},id:moduleId,loaded:!1};return modules[moduleId].call(module.exports,module,module.exports,__webpack_require__),module.loaded=!0,module.exports}var installedModules={};return __webpack_require__.m=modules,__webpack_require__.c=installedModules,__webpack_require__.p="/Users/guoshencheng/Documents/OtherProject/map/public/javascripts/dist",__webpack_require__(0)}([function(module,exports,__webpack_require__){var canvas=(__webpack_require__(1),__webpack_require__(2),__webpack_require__(4)),undo=__webpack_require__(5),drawingboard=__webpack_require__(8)(canvas);drawingboard.draw(),window.goback=undo.goBackInHistory,window.gofont=undo.goForthInHistory,window.clearCanvas=function(){var ctx=canvas.context;ctx.clearRect(0,0,canvas.width,canvas.height),undo.saveHistory()},undo.saveHistory();var pencil=document.getElementById("pencil"),eraser=document.getElementById("eraser"),small=document.getElementById("small_size"),middle=document.getElementById("middle_size"),large=document.getElementById("large_size"),tool=[pencil,eraser],size=[small,middle,large],setSizeOfElement=function(element){element==large?drawingboard.size=10:element==middle?drawingboard.size=5:drawingboard.size=1},setColorOfElement=function(element){eraser==element?drawingboard.color="#ffffff":drawingboard.color="#000000"},clicktool=function(){var current=this;setColorOfElement(current),tool.forEach(function(child){child==current?(child.style.backgroundColor="white",child.style.color="black"):(child.style.backgroundColor="black",child.style.color="white")})},clickSize=function(){var current=this;setSizeOfElement(current),size.forEach(function(child){var icon=child.getElementsByClassName("size_icon")[0];child==current?icon.style.backgroundColor="white":icon.style.backgroundColor="black"})};size.forEach(function(child){child.clickSize=clickSize,child.addEventListener("touchstart",clickSize)}),tool.forEach(function(child){child.clicktool=clicktool,child.addEventListener("touchstart",clicktool)}),pencil.clicktool(),small.clickSize()},function(module,exports){var isColor=function(string){return!(!string||!string.length)&&(/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(string)||$.inArray(string.substring(0,3),["rgb","hsl"])!==-1)},RGBToInt=function(r,g,b){var c=0;return c|=(255&r)<<16,c|=(255&g)<<8,c|=255&b},pixelAt=function(image,x,y){var i=4*(y*image.width+x),c=DrawingBoard.Utils.RGBToInt(image.data[i],image.data[i+1],image.data[i+2]);return[i,x,y,c]},compareColors=function(a,b,tolerance){if(0===tolerance)return a===b;var ra=a>>16&255,rb=b>>16&255,ga=a>>8&255,gb=b>>8&255,ba=255&a,bb=255&b;return Math.abs(ra-rb)<=tolerance&&Math.abs(ga-gb)<=tolerance&&Math.abs(ba-bb)<=tolerance};!function(){for(var vendors=["ms","moz","webkit","o"],x=0;x<vendors.length&&!window.requestAnimationFrame;++x)window.requestAnimationFrame=window[vendors[x]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[vendors[x]+"CancelAnimationFrame"]||window[vendors[x]+"CancelRequestAnimationFrame"]}(),module.exports={isColor:isColor,RGBToInt:RGBToInt,pixelAt:pixelAt,compareColors:compareColors}},function(module,exports,__webpack_require__){(function(module){var MicroEvent=function(){};MicroEvent.prototype={bind:function(event,fct){this._events=this._events||{},this._events[event]=this._events[event]||[],this._events[event].push(fct)},unbind:function(event,fct){this._events=this._events||{},event in this._events!=!1&&this._events[event].splice(this._events[event].indexOf(fct),1)},trigger:function(event){if(this._events=this._events||{},event in this._events!=!1)for(var i=0;i<this._events[event].length;i++)this._events[event][i].apply(this,Array.prototype.slice.call(arguments,1))}},MicroEvent.mixin=function(destObject){for(var props=["bind","unbind","trigger"],i=0;i<props.length;i++)destObject.prototype[props[i]]=MicroEvent.prototype[props[i]]},"undefined"!=typeof module&&"exports"in module&&(module.exports=MicroEvent)}).call(exports,__webpack_require__(3)(module))},function(module,exports){module.exports=function(module){return module.webpackPolyfill||(module.deprecate=function(){},module.paths=[],module.children=[],module.webpackPolyfill=1),module}},function(module,exports){var canvas=document.getElementById("drawingboard"),getContext=function(){return canvas&&canvas.getContext&&canvas.getContext("2d")?canvas.getContext("2d"):null},context=getContext();canvas.context=context,canvas.on=function(event,cb){canvas.addEventListener(event,cb,!1)},module.exports=canvas},function(module,exports,__webpack_require__){var SimpleUndo=__webpack_require__(6),image=__webpack_require__(7),history=new SimpleUndo({maxLength:10,provider:function(done){done(image.getImage())}}),saveHistory=function(){history.save()},goBackInHistory=function(){history.undo(image.setImage)},goForthInHistory=function(){history.redo(image.setImage)};module.exports={saveHistory:saveHistory,goBackInHistory:goBackInHistory,goForthInHistory:goForthInHistory}},function(module,exports,__webpack_require__){!function(){"use strict";function truncate(stack,limit){for(;stack.length>limit;)stack.shift()}var SimpleUndo=function(options){var settings=options?options:{},defaultOptions={provider:function(){throw new Error("No provider!")},maxLength:30,onUpdate:function(){}};this.provider="undefined"!=typeof settings.provider?settings.provider:defaultOptions.provider,this.maxLength="undefined"!=typeof settings.maxLength?settings.maxLength:defaultOptions.maxLength,this.onUpdate="undefined"!=typeof settings.onUpdate?settings.onUpdate:defaultOptions.onUpdate,this.initialItem=null,this.clear()};SimpleUndo.prototype.initialize=function(initialItem){this.stack[0]=initialItem,this.initialItem=initialItem},SimpleUndo.prototype.clear=function(){this.stack=[this.initialItem],this.position=0,this.onUpdate()},SimpleUndo.prototype.save=function(){this.provider(function(current){truncate(this.stack,this.maxLength),this.position=Math.min(this.position,this.stack.length-1),this.stack=this.stack.slice(0,this.position+1),this.stack.push(current),this.position++,this.onUpdate()}.bind(this))},SimpleUndo.prototype.undo=function(callback){if(this.canUndo()){var item=this.stack[--this.position];this.onUpdate(),callback&&callback(item)}},SimpleUndo.prototype.redo=function(callback){if(this.canRedo()){var item=this.stack[++this.position];this.onUpdate(),callback&&callback(item)}},SimpleUndo.prototype.canUndo=function(){return this.position>0},SimpleUndo.prototype.canRedo=function(){return this.position<this.count()},SimpleUndo.prototype.count=function(){return this.stack.length-1},module.exports=SimpleUndo,"undefined"!=typeof window&&(window.SimpleUndo=SimpleUndo)}()},function(module,exports,__webpack_require__){var canvas=__webpack_require__(4),getImage=function(){return canvas.toDataURL("image/png")},setImage=function(src){if(src){var ctx=canvas.context,img=new Image,oldGCO=ctx.globalCompositeOperation;img.onload=function(){ctx.globalCompositeOperation="source-over",ctx.clearRect(0,0,canvas.width,canvas.height),ctx.drawImage(img,0,0,canvas.width,canvas.height),ctx.globalCompositeOperation=oldGCO},img.src=src}};module.exports={getImage:getImage,setImage:setImage}},function(module,exports,__webpack_require__){var undo=__webpack_require__(5);module.exports=function(canvas){var drawingboard={};drawingboard.canvas=canvas,drawingboard.coords={},drawingboard.drawing=!1,drawingboard.size=1,drawingboard.color="#000000",drawingboard.getInputCoords=function(e){e=e.originalEvent?e.originalEvent:e;var x,y,rect=canvas.getBoundingClientRect(),width=canvas.width,height=canvas.height;return e.touches&&1==e.touches.length?(x=e.touches[0].pageX,y=e.touches[0].pageY):(x=e.pageX,y=e.pageY),x-=canvas.offsetLeft,y-=canvas.offsetTop,x*=width/rect.width,y*=height/rect.height,{x:x,y:y}},drawingboard.getMidInputCoords=function(coords){return{x:drawingboard.coords.old.x+coords.x>>1,y:drawingboard.coords.old.y+coords.y>>1}},drawingboard.draw=function(){if(drawingboard.drawing){var ctx=canvas.context;ctx.lineWidth=drawingboard.size,ctx.strokeStyle=drawingboard.color;var currentMid=drawingboard.getMidInputCoords(drawingboard.coords.current);ctx.beginPath(),ctx.strokeStyle=drawingboard.color,ctx.moveTo(currentMid.x,currentMid.y),ctx.quadraticCurveTo(drawingboard.coords.old.x,drawingboard.coords.old.y,drawingboard.coords.oldMid.x,drawingboard.coords.oldMid.y),ctx.stroke(),drawingboard.coords.old=drawingboard.coords.current,drawingboard.coords.oldMid=currentMid}requestAnimationFrame&&requestAnimationFrame(drawingboard.draw)},canvas.on("touchstart",function(e){onTouchStart(e,drawingboard.getInputCoords(e))}),canvas.on("touchmove",function(e){onTouchMove(e,drawingboard.getInputCoords(e))}),canvas.on("touchend",function(e){onTouchStop(e,drawingboard.getInputCoords(e))});var onTouchStart=function(e,coords){drawingboard.coords.current=drawingboard.coords.old=coords,drawingboard.coords.oldMid=drawingboard.getMidInputCoords(coords),drawingboard.drawing=!0,requestAnimationFrame||drawingboard.draw(),e.stopPropagation(),e.preventDefault()},onTouchMove=function(e,coords){drawingboard.coords.current=coords,requestAnimationFrame||drawingboard.draw(),e.stopPropagation(),e.preventDefault()},onTouchStop=function(e,coords){!drawingboard.drawing||e.touches&&0!==e.touches.length||(drawingboard.drawing=!1,undo.saveHistory(),e.stopPropagation(),e.preventDefault())};return drawingboard}}]);