var successResponse = require('../../utils/response');

const createCook = (req, res, next) => {
    console.log('req.body:', req.body);
    const { foodName, tempFilePaths, foodDescribe, material, steps } = req.body;
    var sql = `INSERT INTO cookbook (foodName, tempFilePaths, foodDescribe, material, steps)
    VALUES(?, ?, ?, ?, ?, ?)`;
    connection.query(sql, [foodName, tempFilePaths, foodDescribe, material, steps], function (err, data) {
        if (err) {
            // some error occured
            res.send({ code: 1, msg: '创建失败' })
        } else {
            // successfully inserted into db
            res.send({ code: 0, msg: '创建成功' })
        }
    });

}
module.exports = createCook;