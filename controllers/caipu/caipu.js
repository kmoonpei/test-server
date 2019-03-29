var connection = require('../../modle/mysql');
var successResponse = require('../../utils/response');

const allCaipu = (req, res, next) => {
    const page = req.body.page
    const data = connection.query('SELECT * FROM caipu;', function (err, rows, fields) {
        if (err) console.log(err);
        res.send(successResponse(rows))
    })
}
module.exports = { allCaipu };