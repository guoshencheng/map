var SimpleUndo = require('simple-undo')
var image = require('./image')
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

