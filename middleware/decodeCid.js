var FIRST_INDEX = 13 
var SECOUND_INDEX = 7
var ENCODE_LIST = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
var ENCODE_PREFIX = 'rna'
var SHARE_SUFIX = 'eyn'

var checkCidParam = function(req, res, next) {
  var param = req.params.encodeCid
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

var encodeParam = function(param) {
  return generatePrefix(param) + generateMd5(param)
}

var generatePrefix = function(param) {
  var result = ''
  if (param === 0) {
    result = 'a'
  }
  while (param !== 0) {
    result += ENCODE_LIST[param % 52]
    param = param / 52
  }
  return result
}

var generateMd5 = function(param) {
  var crypto = require('crypto')
  var md5String = crypto.createHash('md5').update('rna' + param + 'eyn').digest('hex').toUpperCase()
  return md5String.charAt(FIRST_INDEX) + md5String.charAt(SECOUND_INDEX)
}

var checkCid = function(cid, param) {
  var crypto = require('crypto')
  var md5String = crypto.createHash('md5').update('rna' + cid + 'eyn').digest('hex').toUpperCase()
  return param.length >= 2 && (md5String.charAt(FIRST_INDEX) == param.charAt(param.length - 2)) && (md5String.charAt(SECOUND_INDEX) == param.charAt(param.length - 1))
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

module.exports = {
  checkCidParam: checkCidParam,
  encodeParam: encodeParam
}


