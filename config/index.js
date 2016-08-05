var devUrls = {
  IMAGE_SIGNATURE_URL: "http://app.ry.api.renyan.cn/rest/selection/card/sign"
}
var urls = {
  IMAGE_SIGNATURE_URL: "http://app.ry.api.renyan.cn/rest/selection/card/sign"
}

module.exports = {
  urls: process.env.NODE_ENV == "production" ? urls : devUrls
}
