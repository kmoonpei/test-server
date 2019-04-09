const { hello, logout } = require('./login');
const { login_WX, userInfo } = require('./loginWX');
const { order_list, getUsers, works } = require('./orderlist');
const createCook = require('./createCook');
const register = require('./register');

const user_controller = {
    hello,
    login_WX,
    logout,
    order_list,
    getUsers,
    createCook,
    register,
    userInfo,
    works,
}
module.exports = user_controller;