const { hello, logout } = require('./login');
const { login_WX, userInfo } = require('./loginWX');
const { order_list, works, my_collects } = require('./orderlist');
const createCook = require('./createCook');
const register = require('./register');

const user_controller = {
    hello,
    login_WX,
    logout,
    order_list,
    createCook,
    register,
    userInfo,
    works,
    my_collects,
}
module.exports = user_controller;