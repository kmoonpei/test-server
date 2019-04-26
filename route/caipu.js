var router = require('./index');
var caipuController = require('../controllers/caipu');

//菜谱首页
router.post('/caipu/index', caipuController.allCaipu);
//菜谱详情页
router.post('/caipu/detail', caipuController.caipuDetail);
//收藏菜谱
router.post('/caipu/collect',caipuController.caipu_collect);
//搜索菜谱
router.post('/caipu/search',caipuController.caipu_search);
module.exports = router;