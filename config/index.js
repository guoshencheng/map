var paths = {
  IMAGE_SIGNATURE_URL: "/selection/card/sign",
  FETCH_ACTIVITY: "/activity/get_by_acid/"
}

module.exports = {
  paths: paths,
  domin: process.env.NODE_ENV == "production" ? 'http://app.ry.api.renyan.cn/rest' : 'http://testry.renyan.cn/rest'
}
