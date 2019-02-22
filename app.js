var express = require('express');
var app = express();

app.get('/user', function (req, res) {
    res.send('hello world');
});
app.post('/user/data', function (req, res) {
    console.log('req:', req)
    // if(req.params.type==1){
        res.send(req);
    // }
});
app.use(express.static('public'));
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

