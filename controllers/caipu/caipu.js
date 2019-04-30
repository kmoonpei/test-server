var connection = require('../../modle/mysql');
var successResponse = require('../../utils/response');

const allCaipu = (req, res, next) => {
    const page = req.body.page
    connection.query('SELECT * FROM caipu LIMIT 10 ;', function (err, rows, fields) {
        if (err) console.log(err);
        rows.forEach(element => {
            element.material = JSON.parse(element.material);
            element.steps = JSON.parse(element.steps);
        });
        res.send(successResponse(rows))
    })
}
const caipuDetail = (req, res, next) => {
    const id = req.body.cpid
    // let uid = req.session.uid;
    let uid = req.body.uid
    console.log("session_data:", req.session)
    connection.query(`SELECT * FROM collect_caipu WHERE cpid=${id}`, function (err, rows, fields) {
        if (err) { console.log(err) }
        let count = rows.length ? rows.length : 0;
        let is_collected = 0;
        console.log("rows:", rows)
        rows.forEach(item => {
            console.log("item.uid:", item.uid)
            console.log("uid:", uid)

            if (item.uid === uid) {
                is_collected = 1;
                console.log("item.uid1:", item.uid)
            }
        })
        connection.query(`SELECT *,${count} AS collect_count,${is_collected} AS is_collected FROM caipu WHERE id=${id}`, function (err, rows1, fields) {
            if (err) { console.log(err) }
            res.send(successResponse(rows1[0]))
        })
    })

}
module.exports = { allCaipu, caipuDetail };