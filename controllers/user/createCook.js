var successResponse = require('../../utils/response');
var connection = require('../../modle/mysql');


const createCook = (req, res, next) => {
    console.log('req.body:', req.body);

    const { foodName, tempFilePaths, foodDescribe, material, steps } = req.body;
    var sql = `INSERT INTO caipu (foodName, tempFilePaths, foodDescribe, material, steps)
    VALUES(?, ?, ?, ?, ?)`;
    connection.query(sql, [foodName, tempFilePaths, foodDescribe, JSON.stringify(material), JSON.stringify(steps)], function (err, data) {
        if (err) {
            // some error occured
            console.log('创建失败：', err)
            res.send({ code: 1, msg: '创建失败' })
        } else {
            // successfully inserted into db
            console.log('创建成功')

            res.send({ code: 0, msg: '创建成功' })
        }
    });

}
module.exports = createCook;