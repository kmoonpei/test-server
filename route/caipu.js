var router = require('./index');
var caipuController = require('../controllers/caipu');

router.post('/caipu/index', caipuController.allCaipu);
router.post('/caipu/detail', caipuController.caipuDetail);
router.post('/caipu/collect',caipuController.caipu_collect);
module.exports = router;