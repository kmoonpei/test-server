
const getData = require('../../utils/http');
const crypto = require('crypto');
var successResponse = require('../../utils/response');

loginWX = (req, res, next) => {
    var code = req.body.code;
    var APPID = 'wx0e1c3d3df616a660';
    var APPSECRET = '6589dc67b26199b5396907f5ddb41780';
    var url = `https://api.weixin.qq.com/sns/jscode2session?appid=${APPID}&secret=${APPSECRET}&js_code=${code}&grant_type=authorization_code`

    getData(url, function (data) {
        const session_key = JSON.parse(data).session_key;
        console.log('data', data)
        const skey = encryptSha1(session_key);
        res.send(successResponse({ skey: skey }, '登录成功'))
    })
}

function encryptSha1(data) {
    return crypto.createHash('sha1').update(data, 'utf8').digest('hex')
}

module.exports = loginWX;
