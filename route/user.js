var router = require('./index');
//控制器模块
const user_controller = require('../controllers/user');

///路由///

router.get('/user', user_controller.hello);
//注册
router.post('/user/register', user_controller.register);
//微信登录
router.post('/user/loginWX', user_controller.login_WX);
//登录
router.post('/user/login', user_controller.login);
//退出登录
router.get('/user/logout', user_controller.logout)
//获取用户信息
router.post('/user/order_list', user_controller.order_list);
//获取用户列表
router.post('/user/data1', user_controller.getUsers);
//创建菜谱
router.post('/user/createcook', user_controller.createCook);

module.exports = router;

