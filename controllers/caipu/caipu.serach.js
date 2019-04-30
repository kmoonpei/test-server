const connection = require('../../modle/mysql')
const successResponse = require('../../utils/response');


const caipu_search = (req, res, next) => {
    let { page, keyword } = req.body;
    let start = (page - 1) * 10;
    connection.query(`SELECT * FROM caipu WHERE material LIKE('%${keyword}%') LIMIT ${start},10`, function (err, rows, fields) {
        if (err) {
            console.log(err)
        }
        res.send(successResponse(rows))
    })
}

module.exports = caipu_search;