
var contentCard = document.getElementsByClassName('content_card')[0]
var image = contentCard.getElementsByTagName('img')[0]
image.onload = function() {
  console.log('onloaded')
var templateCicle = document.getElementsByClassName('circle_template')
var templateRect = document.getElementsByClassName('rect_template')
var templateTall = document.getElementsByClassName('tall_template')
var templateFlat = document.getElementsByClassName('flat_template')
var templateText = document.getElementsByClassName('text_template')
var templatePicture = document.getElementsByClassName('picture_template')

function centerImage(image, container) {
  var left = (container.clientWidth - image.width) / 2
  var top = (container.clientHeight - image.height) / 2
  image.style.left = left + 'px'
  image.style.top = top + 'px'
  image.style.display = 'block'
}

function adjustImageSize(image, tarScale) {
  var scale = image.height / image.width
  if (scale <= tarScale) {
    image.height = imageContainer.clientHeight
    image.width = image.height / scale
  } else {
    image.width = imageContainer.clientWidth
    image.height = image.width * scale
  }
}

if (templateCicle  && templateCicle.length > 0) {
  var block = templateCicle[0]
  var imageContainer = block.getElementsByClassName('rect_image_container')[0]
  imageContainer.style.height = imageContainer.clientWidth + 'px'
  imageContainer.style.borderRadius = imageContainer.clientWidth / 2 + 'px'
  adjustImageSize(image, 1)
  centerImage(image, imageContainer)
}

if (templateRect && templateRect.length > 0) {
  var block = templateRect[0]
  var imageContainer = block.getElementsByClassName('rect_image_container')[0]
  imageContainer.style.height = imageContainer.clientWidth + 'px'
  adjustImageSize(image, 1)
  centerImage(image, imageContainer)
}

if (templateTall && templateTall.length > 0) {
  var block = templateTall[0]
  var imageContainer = block.getElementsByClassName('rect_image_container')[0]
  imageContainer.style.height = imageContainer.clientWidth * 4 / 3.0 + 'px'
  adjustImageSize(image, 1)
  centerImage(image, imageContainer)
}

if (templateFlat && templateFlat.length > 0) {
  var block = templateFlat[0]
  var imageContainer = block.getElementsByClassName('rect_image_container')[0]
  imageContainer.style.height = imageContainer.clientWidth * 3 / 4.0 + 'px'
  adjustImageSize(image, 1)
  centerImage(image, imageContainer)
}

if (templateText && templateText.length > 0) {
  var block = templateText[0]
  var imageContainer = block.getElementsByClassName('rect_image_container')[0]
  imageContainer.style.height = 0 + 'px'
  var contentText = block.getElementsByClassName('content_text')[0]
  contentText.style.marginTop = '0px'
  image.style.display = 'none'
  image.height = 0;
}

if (templatePicture && templatePicture.length > 0) {
  var block = templatePicture[0]
  var imageContainer = block.getElementsByClassName('rect_image_container')[0]
  imageContainer.style.height = imageContainer.clientWidth * 4 / 3.0 + 'px'
  adjustImageSize(image, 1)
  centerImage(image, imageContainer)
}
}
