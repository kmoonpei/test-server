var successResponse = require('../../utils/response');
var connection = require('../../modle/mysql');


const register = (req, res, next) => {
    console.log('req.body:', req.body);
    const { name, age, phone } = req.body;
    var sql = `INSERT INTO user (name,age,phone)VALUES(?,?,?)`;
    connection.query(sql, [name, age, phone], function (err, data) {
        if (err) {
            // some error occured
            res.send({ code: 1, msg: '创建失败' })
        } else {
            // successfully inserted into db
            res.send({ code: 0, msg: '创建成功' })
        }
    });

}
module.exports = register;