var successResponse = require('../../utils/response');
var connection = require('../../modle/mysql');


const order_list = (req, res, next) => {
    var type = req.body.type;
    console.log('type:', type);
    if (type === 1) {
        var nickName = req.session.nickName;
        console.log("req:", req)
        if (nickName) {
            // req.sessionID
            res.send(successResponse({ sid: req.sessionID, nickName: nickName }, 'list请求成功'))
        } else {
            res.send({ code: 1, msg: '用户还未登录，请先登录' })
        }
    } else {
        res.send({ code: 1, msg: '参数错误' })
    }

}

//获取我的发布
const works = (req, res) => {
    let { uid } = req.body;
    connection.query(`SELECT * FROM caipu WHERE uid="${uid}"`, function (err, rows, fields) {
        if (err) { console.log(err) }
        res.send(successResponse(rows))
    })
}
//获取我的收藏
const my_collects = (req, res) => {
    let { uid } = req.body;
    connection.query(`SELECT * FROM collect_caipu AS a LEFT JOIN caipu AS b ON b.id=a.cpid WHERE a.uid=${uid}`, function (err, rows, fields) {
        if (err) { console.log(err) }
        res.send(successResponse(rows))
    })
}

module.exports = { order_list, works, my_collects };