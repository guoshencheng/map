var paths = {
  FETCH_CONTENT: '/card/get_by_cids'
}

module.exports = {
  paths: paths,
  domin: process.env.NODE_ENV == "production" ? 'http://pink.renyan.cn/rest' : 'http://pink.renyan.cn/rest',
}



