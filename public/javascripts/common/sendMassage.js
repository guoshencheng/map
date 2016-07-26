function configureShare (shareConfig) {
  if (window.android && android.configureShare) {
    android.configureShare(JSON.stringify(shareConfig))
  }
  if (window.webkit && webkit.messageHandlers && webkit.messageHandlers.message && webkit.messageHandlers.message.postMessage) {
    window.webkit.messageHandlers.message.postMessage(JSON.stringify(shareConfig));
  }
}

function share() {
  if (window.android && android.share) {
    android.share()
  }
  if (window.webkit && webkit.messageHandlers && webkit.messageHandlers.share && webkit.messageHandlers.share.postMessage) {
    window.webkit.messageHandlers.share.postMessage('');
  }
}

function joinActivity() {
  if (window.android && android.startPublish) {
    android.startPublish()
  }
  if (window.webkit && webkit.messageHandlers && webkit.messageHandlers.startPublish && webkit.messageHandlers.startPublish.postMessage) {
    window.webkit.messageHandlers.startPublish.postMessage('');
  }
}

