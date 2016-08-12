function setUserInfo(userInfo) {
  alert(userInfo)
  userInfo = JSON.parse(userInfo)
  console.log(userInfo)
  window.userInfo = userInfo
}


function canRyShare() {
  return (window.android && android.configureShare) ||  (window.webkit && webkit.messageHandlers && webkit.messageHandlers.message && webkit.messageHandlers.message.postMessage)
}

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
  if (window.android && android.startPublishActivity) {
    android.startPublishActivity()
  }
  if (window.webkit && webkit.messageHandlers && webkit.messageHandlers.startPublishViewController && webkit.messageHandlers.startPublishViewController.postMessage) {
    window.webkit.messageHandlers.startPublishViewController.postMessage('');
  }
}

function showActivityDetail(topicId) {
  topicId = topicId || 1
 if (window.android && android.showActivityDetail) {
    android.showActivityDetail(topicId)
  }
  if (window.webkit && webkit.messageHandlers && webkit.messageHandlers.showActivityDetail && webkit.messageHandlers.showActivityDetail.postMessage) {
    window.webkit.messageHandlers.showActivityDetail.postMessage(topicId);
  }
}

