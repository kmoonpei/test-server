const connection = require('../../modle/mysql');

const caipu_collect = (req, res, next) => {
    let { uid, cpid } = req.body;
    connection.query(`SELECT * FROM collect_caipu WHERE uid=${uid} AND cpid=${cpid}`, function (err, rows, fields) {
        if (err) { console.log(err) }
        if(rows.length===0){
            let sql=`INSERT INTO collect_caipu (cpid,uid)VALUES(?,?)`;
            connection.query(sql,[cpid,uid],function(err,data){
                if (err) {
                    // some error occured
                    res.send({ code: 1, msg: '收藏失败' })
                } else {
                    // successfully inserted into db
                    res.send({ code: 0, msg: '收藏成功' })
                }
            })
        }else{
            connection.query(`DELETE FROM collect_caipu WHERE uid=${uid} AND cpid=${cpid}`,function(err){
                if(err)console.log(err)
                res.send({ code: 0, msg: '取消收藏' })
            })
        }
    })
}

module.exports = caipu_collect;