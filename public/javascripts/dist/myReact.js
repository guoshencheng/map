!function(modules){function __webpack_require__(moduleId){if(installedModules[moduleId])return installedModules[moduleId].exports;var module=installedModules[moduleId]={exports:{},id:moduleId,loaded:!1};return modules[moduleId].call(module.exports,module,module.exports,__webpack_require__),module.loaded=!0,module.exports}var installedModules={};return __webpack_require__.m=modules,__webpack_require__.c=installedModules,__webpack_require__.p="/Users/guoshencheng/Documents/OtherProject/node_server/public/javascripts/dist",__webpack_require__(0)}([function(module,exports,__webpack_require__){var Header=__webpack_require__(8),HelloMessage=React.createClass({displayName:"HelloMessage",render:function(){return React.createElement("div",null,React.createElement(Header,{title:"GUOSHENCHENG"}))}}),container=document.body;ReactDOM.render(React.createElement(HelloMessage,{name:"Guoshencheng"}),container)},,,,,,,,function(module,exports,__webpack_require__){module.exports=__webpack_require__(9)},function(module,exports,__webpack_require__){__webpack_require__(10);var Timer=React.createClass({displayName:"Timer",getInitialState:function(){return{}},componentDidMount:function(){},componentWillUnmount:function(){},render:function(){return React.createElement("div",{id:"navigation"},React.createElement("p",{className:"title_text"}," ",this.props.title," "))}});module.exports=Timer},function(module,exports){}]);