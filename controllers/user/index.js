const { hello, login, logout } = require('./login');
const login_WX = require('./loginWX');
const { order_list, getUsers } = require('./orderlist');

const user_controller = {
    hello,
    login_WX,
    login,
    logout,
    order_list,
    getUsers,
}
module.exports = user_controller;