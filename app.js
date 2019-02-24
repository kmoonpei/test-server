var express = require('express');
var app = express();
const connection = require('./modle/mysql');
var bodyParser = require('body-parser');
app.use(bodyParser.json());

app.get('/user', function (req, res) {
    res.send('hello world');
});
app.get('/user/data', function (req, res) {
    const data = connection.query('SELECT * FROM users;', function (err, rows, fields) {
        if (err) console.log(err);
        res.send(successResponse(rows))
    })
});

app.post('/user/data1', function (req, res) {
    const data = connection.query('SELECT * FROM users;', function (err, rows, fields) {
        if (err) console.log(err);
        res.send(successResponse(rows))
    })
})

function successResponse(data, msg = '') {
    return { code: 0, data: data, msg }
}

app.use(express.static('public'));
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

