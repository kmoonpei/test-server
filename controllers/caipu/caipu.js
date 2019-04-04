var connection = require('../../modle/mysql');
var successResponse = require('../../utils/response');

const allCaipu = (req, res, next) => {
    const page = req.body.page
    const data = connection.query('SELECT * FROM caipu;', function (err, rows, fields) {
        if (err) console.log(err);
        rows.forEach(element => {
            element.material = JSON.parse(element.material);
            element.steps = JSON.parse(element.steps);
        });
        res.send(successResponse(rows))
    })
}
const caipuDetail = (req, res, next) => {
    const id = req.body.id
    const data = connection.query(`SELECT * FROM caipu WHERE id=${id}`, function (err, rows, fields) {
        if (err) { console.log(err) }
        res.send(successResponse(rows[0]))
    })
}
module.exports = { allCaipu, caipuDetail };