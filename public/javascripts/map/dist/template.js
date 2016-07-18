

var templateCicle = document.getElementsByClassName('circle_template')
var templateRect = document.getElementsByClassName('rect_template')
var templateTall = document.getElementsByClassName('tall_template')
var templateFlat = document.getElementsByClassName('flat_template')
var templateText = document.getElementsByClassName('text_template')
var templatePicture = document.getElementsByClassName('picture_template')

if (templateCicle  && templateCicle.length > 0) {
  var block = templateCicle[0]
  var image = block.getElementsByTagName('img')[0]
  image.height = image.width
  image.style.borderRadius = '50%'
}

if (templateRect && templateRect.length > 0) {
  var block = templateCicle[0]
  var image = block.getElementsByTagName('img')[0]
  image.height = image.width
}

if (templateTall && templateTall.length > 0) {
  var block = templateCicle[0]
  var image = block.getElementsByTagName('img')[0]
  image.height = image.width * 4 / 3.0
}

if (templateFlat && templateFlat.length > 0) {
  var block = templateCicle[0]
  var image = block.getElementsByTagName('img')[0]
  image.height = image.width * 3 / 4.0
}

if (templateText && templateText.length > 0) {
  var block = templateCicle[0]
  var image = block.getElementsByTagName('img')[0]
  var contentText = block.getElementsByClassName('content_text')[0]
  contentText.style.marginTop = '0px'
  image.style.display = 'none'
  image.height = 0;
}

if (templatePicture && templatePicture.length > 0) {
  var block = templateCicle[0]
  var image = block.getElementsByTagName('img')[0]
  image.height = image.width * 4 / 3.0
}
