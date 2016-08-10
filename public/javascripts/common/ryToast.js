
function showRyToast(id, message, confirm, cancel, text) {
  var alertView = document.getElementById(id)
  if (alertView) {
    if (message) {
      var messageContainer = alertView.getElementsByClassName('renyan_mask_message')[0]
      messageContainer.textContent = message
    }
    if (confirm) {
      var confirmContainer = getElementByClass(alertView, 'renyan_mask_confirm_button')
      if (confirmContainer) {
       if (confirm.text) confirmContainer.textContent = confirm.text
       if (confirm.onclick) confirmContainer.setAttribute('onclick', confirm.onclick)
      }
    }
    if (cancel) {
      var cancelContainer = getElementByClass(alertView, 'renyan_mask_cancel_button')
      if (cancelContainer) {
       if (cancel.text) cancelContainer.textContent = cancel.text
       if (cancel.onclick) cancelContainer.setAttribute('onclick', cancel.onclick)
      }
    }
    alertView.className = "renyan_mask renyan_mask_show"
  }
}

function hideRyToast(id) {
  var alertView = document.getElementById(id)
  if (alertView) {
    alertView.className = "renyan_mask renyan_mask_hide"
  }
}

var getElementByClass = function(parent, classname) {
 var nodes = parent.getElementsByClassName(classname)
 if (nodes && nodes.length > 0) {
    return nodes[0]
 } else {
    return null
 }
}

