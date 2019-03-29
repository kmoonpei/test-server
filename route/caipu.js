var router = require('./index');
var caipuController = require('../controllers/caipu');

router.post('/caipu/index', caipuController.allCaipu);
module.exports = router;