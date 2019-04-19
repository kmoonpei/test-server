var connection = require('../../modle/mysql');
var successResponse = require('../../utils/response');

const allCaipu = (req, res, next) => {
    const page = req.body.page
    connection.query('SELECT * FROM caipu;', function (err, rows, fields) {
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
    connection.query(`SELECT COUNT(cpid) AS count FROM collect_caipu WHERE cpid=${id}`, function (err, rows, fields) {
        if (err) { console.log(err) }
        let count = rows[0].count;
        connection.query(`SELECT *,${count} AS collect_count FROM caipu WHERE id=${id}`, function (err, rows1, fields) {
            if (err) { console.log(err) }
            res.send(successResponse(rows1[0]))
        })
    })
    
}
module.exports = { allCaipu, caipuDetail };