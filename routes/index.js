var express = require('express');
var router = express.Router();
var contentText = '超梦的体形与梦幻相去甚远：其形象类似于双足猫科动物，通体银灰，尾巴和腹部呈现紫色，由背部中心伸出的体外神经束一直延伸到后脖颈。超梦属于超能力系，通过精神干扰实现飞行，也可以通过读心术实现与人的对话。在战斗时，超梦可以利用其超能力的本能建立护罩，或将精神攻击掷向对手 。超梦具有很强的自我再生能力，能够迅速地从濒死状态恢复过来'
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/map/:id', function(req, res, next) {
  var cid = req.params.id
  var request = require('request');
  request('http://operation.renyan.cn/rest/share/position/' + cid, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    var result = JSON.parse(body);
    res.render('map', {
      user: {
        nickname: 'GUOSHENCHENG',
        avatar: '/images/avatar_demo.png',
        view_count: 123,
        follow_count: 120
      },
      content: {
        text: contentText,
        image: 'http://www.codeblocq.com/assets/projects/hexo-theme-magnetic/assets/work1.jpg',
        album_name: 'GUOSHENCHENG的言集',
        templete: 1
      }, 
      current_spread_count: 30000, 
      view_raise_count: 300,
      user_view_count: 3000,
      spread_rate: 83,
      spread_distance: 1000,
      content_text: contentText,
      album_name: 'GUOSHENCHENG的言集',
      point: result.position,
      result: result});
  } else {
    res.json({error})
  }
})
}) 

module.exports = router;
