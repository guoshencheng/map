
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
