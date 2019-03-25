var successResponse = require('../../utils/response');


const login = (req, res, next) => {
    if (req.body.name && req.body.pwd) {
        req.session.regenerate(function (err) {
            if (err) {
                return res.send({ code: 2, msg: '登录失败' });
            }
            req.session.loginUser = req.body.name;
            res.send(successResponse({ sess: req.session.loginUser }, '登录成功'));
        });
    } else {
        res.send({ code: 1, msg: '账号或密码错误' });
    }
}
const logout = (req, res, next) => {
    req.session.destroy(function (err) {
        if (err) {
            res.json({ code: 2, msg: '退出登录失败' });
            return;
        }
        // res.clearCookie('skey');
        res.send(successResponse({}, '退出登录'))
    });
}
const hello = (req, res) => {
    res.send('hello world')
}
module.exports = { login, hello, logout };