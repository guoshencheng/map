var paths = {
  IMAGE_SIGNATURE_URL: "/selection/card/sign",
  FETCH_ACTIVITY: "/activity/get_by_acid/",
  POST_DRAW_IMAGE: '/share/draw/image',
  GET_DRAW_IMAGE: '/share/draw/',
  GET_DRAW_WORKS: '/share/draw/paged'
}

module.exports = {
  paths: paths,
  domin: process.env.NODE_ENV == "production" ? 'http://app.ry.api.renyan.cn/rest' : 'http://testry.renyan.cn/rest',
  shareDomin: process.env.NODE_ENV == "production" ? 'http://activity.renyan.cn' : 'http://activity.test.renyan.cn' 
}


