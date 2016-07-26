var checkCidParam = function(req, res, next) {
  var param = req.params.id
  var cardId = decodeParams(param)
  if (cardId) {
    req.cardId = cardId  
    next()
  } else {
    var err = new Error('Invaild cid param');
    err.status = 510;
    next(err);
  }
}

var decodeParams = function(param) {
  if (param) {
    var cid = generateCid(param)
    if(cid && checkCid(cid, param)) {
      return cid
    } else {
      return undefined
    }
  } else {
    return undefined
  }

}

var checkCid = function(cid, param) {
  var crypto = require('crypto')
  var md5String = crypto.createHash('md5').update('rna' + cid + 'eyn').digest("hex").toUpperCase()
  return param.length >= 2 && (md5String.charAt(13) == param.charAt(param.length - 2)) && (md5String.charAt(7) == param.charAt(param.length - 1))
}

var generateCid = function(param) {
  var cid = 0;
  for (var i  = param.length - 3; i >= 0; i --) {
    cid *= 52
    var c = param.charAt(i)
    if (c >= 'a' && c <= 'z') {
      cid += (c.charCodeAt() - 'a'.charCodeAt())
    } else if (c >= 'A' && c <= 'Z') {
      cid += (c.charCodeAt() - 'A'.charCodeAt() + 26)
    } else {
      return undefined
    }
  }
  return cid
}

module.exports = checkCidParam


