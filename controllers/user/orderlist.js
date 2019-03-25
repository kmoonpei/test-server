var successResponse = require('../../utils/response');
var connection = require('../../modle/mysql');


const order_list = (req, res, next) => {
    var type = req.body.type;
    console.log('type:',type);
    if (type === 1) {
        var loginUser = req.session.loginUser;
        if (loginUser) {
            res.send(successResponse({ sid: req.sessionID, loginUser: loginUser }, 'list请求成功'))
        } else {
            res.send({ code: 1, msg: '用户还未登录，请先登录' })
        }
    } else {
        res.send({ code: 0, msg: '参数错误' })
    }

}
const getUsers = (req, res) => {
    const data = connection.query('SELECT * FROM user;', function (err, rows, fields) {
        if (err) console.log(err);
        res.send(successResponse(rows))
    })
}

module.exports = { order_list, getUsers };