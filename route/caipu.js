var router = require('./index');
var caipuController = require('../controllers/caipu');

router.post('/caipu/index', caipuController.allCaipu);
router.post('/caipu/detail', caipuController.caipuDetail);
module.exports = router;