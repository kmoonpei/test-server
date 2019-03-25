var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var userRouter = require('./route/user');
var indexRouter = require('./route/index');



app.use(bodyParser.json());

// 配置session
app.use(session({
    name: 'skey',
    secret: 'sessiontestlxp',  // 用来对session id相关的cookie进行签名
    // store: new RedisStore({client:client}),  // (使用redis的存储session)
    // store: new FileStore(),  // 本地存储session（文本文件，也可以选择其他store，比如redis的）
    saveUninitialized: false,  // 是否自动保存未初始化的会话，建议false
    resave: false,  // 是否每次都重新保存会话，建议false
    cookie: {
        maxAge: 10 * 60 * 1000  // 有效期，单位是毫秒, 这里设置的是10分钟
    }
}));

app.get('/user', userRouter);
app.post('/user/loginWX', userRouter);
app.post('/user/login', userRouter);
app.get('/user/logout', userRouter);
app.post('/user/order_list', userRouter);
app.post('/user/data1', userRouter);







//静态资源
app.use(express.static('public'));
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

