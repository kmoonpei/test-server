var express = require('express');
var app = express();
var connection = require('./modle/mysql');
var bodyParser = require('body-parser');
var session = require('express-session');
// var FileStore = require('session-file-store')(session);

// var cookieParser = require('cookie-parser');
var redis = require('redis');
var client = redis.createClient('6379', '127.0.0.1');// 默认监听6379端口,'127.0.0.1'为你本地ip(默认不需要修改)
var RedisStore = require('connect-redis')(session);

var identityKey = 'skey';
app.use(bodyParser.json());
// app.use(cookieParser());

// redis 链接错误
client.on_connect('error', function (error) {
    console.log(error);
})

// 配置session
app.use(session({
    name: identityKey,
    secret: 'sessiontestlxp',  // 用来对session id相关的cookie进行签名
    store: new RedisStore({client:client}),  // (使用redis的存储session)
    saveUninitialized: false,  // 是否自动保存未初始化的会话，建议false
    resave: false,  // 是否每次都重新保存会话，建议false
    cookie: {
        maxAge: 10*60 * 1000  // 有效期，单位是毫秒, 这里设置的是10分钟
    }
}));

// app.use(session({
//     name: identityKey,
//     secret: 'sessiontestlxp',// 用来对session id相关的cookie进行签名
//     store: new FileStore(),  // 本地存储session（文本文件，也可以选择其他store，比如redis的）
//     saveUninitialized: false,  // 是否自动保存未初始化的会话，建议false
//     resave: false,  // 是否每次都重新保存会话，建议false
//     cookie: {
//         maxAge: 10 * 1000  // 有效期，单位是毫秒
//     }
// }))

// 检测 session是否正常
// app.use(function (req, res, next) {
//     if (!req.session) {
//         return next(new Error('session错误'))
//     }else {
//         console.log(req.session)//正常打印当前session
//     }
//     next() // 正常 载入下一个中间件
// })

app.get('/user', function (req, res) {
    res.send('hello world');
});

app.post('/user/data1', function (req, res) {
    const data = connection.query('SELECT * FROM user;', function (err, rows, fields) {
        if (err) console.log(err);
        res.send(successResponse(rows))
    })
})

//登录接口
app.post('/user/login', function (req, res, next) {
    var sess = req.session;
    if (req.body.name && req.body.pwd) {
        req.session.regenerate(function (err) {
            if (err) {
                return res.send({ code: 2, msg: '登录失败' });
            }
            req.session.loginUser = 'lili';
            res.send(successResponse({}, '登录成功'));
        });
    } else {
        res.send({ code: 1, msg: '账号或密码错误' });
    }
})

//退出接口
app.get('/user/logout', function (req, res, next) {
    // 备注：这里用的 session-file-store 在destroy 方法里，并没有销毁cookie
    // 所以客户端的 cookie 还是存在，导致的问题 --> 退出登陆后，服务端检测到cookie
    // 然后去查找对应的 session 文件，报错
    // session-file-store 本身的bug    

    req.session.destroy(function (err) {
        if (err) {
            res.json({ ret_code: 2, ret_msg: '退出登录失败' });
            return;
        }

        req.session.loginUser = null;
        res.clearCookie(identityKey);
        res.redirect('/');
    });

    // res.send(successResponse({}, '请求成功'))
});

function successResponse(data, msg = '') {
    return { code: 0, data: data, msg }
}

app.use(express.static('public'));
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

