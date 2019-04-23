var router = require('./index');
//控制器模块
const user_controller = require('../controllers/user');

///路由///

router.get('/user', user_controller.hello);
//注册
router.post('/user/register', user_controller.register);
//微信登录
router.post('/user/loginWX', user_controller.login_WX);
//退出登录
router.get('/user/logout', user_controller.logout);
//获取用户信息
router.post('/user/order_list', user_controller.order_list);
//创建菜谱
router.post('/user/createcook', user_controller.createCook);
//获取用户信息
router.post('/user/info', user_controller.userInfo);
//获取我的发布
router.post('/user/works',user_controller.works);
//获取我的收藏
router.post('/user/my_collects',user_controller.my_collects);

module.exports = router;

