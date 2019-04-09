
const { getData} = require('../../utils/http');
const crypto = require('crypto');
const connection = require('../../modle/mysql');
var successResponse = require('../../utils/response');

const login_WX = (req, res, next) => {
    let { code, nickName, avatarUrl } = req.body;
    var APPID = 'wx0e1c3d3df616a660';
    var APPSECRET = '6589dc67b26199b5396907f5ddb41780';
    var url = `https://api.weixin.qq.com/sns/jscode2session?appid=${APPID}&secret=${APPSECRET}&js_code=${code}&grant_type=authorization_code`

    getData(url, function (data) {
        const { session_key, openid } = JSON.parse(data);
        console.log('data', data)
        const skey = encryptSha1(session_key);
        req.session.regenerate(function (err) {
            if (err) {
                return res.send({ code: 2, msg: '登录失败' });
            }
            req.session.nickName = nickName;//将信息放入cookie中
            let res_data = { skey: skey, openid: openid };
            var sql = `INSERT IGNORE INTO user1 (openid,nickName,avatarUrl)VALUES(?,?,?)`;
            connection.query(sql, [openid, nickName, avatarUrl], function (err, data) {
                if (err) {
                    // some error occured
                } else {
                    // successfully inserted into db
                    connection.query(`SELECT id FROM user1 WHERE openid="${openid}"`, function (err, rows, fields) {
                        if (err) { console.log(err) }
                        res_data.uid = rows[0].id;
                        res.send(successResponse(res_data, '登录成功'));
                    })
                }
            });
            
        });
    })
}

function encryptSha1(data) {
    return crypto.createHash('sha1').update(data, 'utf8').digest('hex')
}

// function insertUser(param) {
//     let { openid, nickName, avatarUrl } = param;
//     var sql = `INSERT IGNORE INTO user1 (openid,nickName,avatarUrl)VALUES(?,?,?)`;
//     connection.query(sql, [openid, nickName, avatarUrl], function (err, data) {
//         if (err) {
//             // some error occured
//         } else {
//             // successfully inserted into db
//             connection.query(`SELECT id FROM user1 WHERE openid="${openid}"`, function (err, rows, fields) {
//                 if (err) { console.log(err) }
//                 res_data.uid = rows[0];
//             })
//         }
//     });
// }

//获取用户详情
const userInfo = (req, res, next) => {
    let { uid } = req.body;
    connection.query(`SELECT * FROM user1 WHERE id="${uid}"`, function (err, rows, fields) {
        if (err) { console.log(err) }
        res.send(successResponse(rows[0]))
    })
}

module.exports = { login_WX, userInfo };
