var express = require('express');
var app = express();
var connection = require('./modle/mysql');
var bodyParser = require('body-parser');
var session = require('express-session');
// var axios = require('axios');
var getData = require('./route/route');
const crypto = require('crypto');
// var getSessionKey = require('./route/getSessionKey');
// var FileStore = require('session-file-store')(session);

// var cookieParser = require('cookie-parser');
// var redis = require('redis');
// var client = redis.createClient('6379', '127.0.0.1');// 默认监听6379端口,'127.0.0.1'为你本地ip(默认不需要修改)
// var RedisStore = require('connect-redis')(session);


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
    if (req.body.name && req.body.pwd) {
        req.session.regenerate(function (err) {
            if (err) {
                return res.send({ code: 2, msg: '登录失败' });
            }
            req.session.loginUser = req.body.name;
            res.send(successResponse({ sess: req.session.loginUser }, '登录成功'));
        });
    } else {
        res.send({ code: 1, msg: '账号或密码错误' });
    }
})

// 退出登录
app.get('/user/logout', function (req, res, next) {
    req.session.destroy(function (err) {
        if (err) {
            res.json({ code: 2, msg: '退出登录失败' });
            return;
        }

        // res.clearCookie('skey');
        // res.redirect('/');
        res.send(successResponse({}, '退出登录'))
    });
});

app.post('/user/order_list', function (req, res, next) {
    var type = req.body.type;
    if (type === 1) {
        var loginUser = req.session.loginUser;
        if (loginUser) {
            res.send(successResponse({ sid: req.sessionID, loginUser: loginUser }, 'list请求成功'))
        } else {
            res.send({ code: 1, msg: '用户还未登录，请先登录' })
        }
    } else {
        res.send({ code: 1, msg: '参数错误' })
    }

})

//微信登录
app.post('/user/loginWx', function (req, res, next) {
    var code = req.body.code;
    var APPID = 'wx0e1c3d3df616a660';
    var APPSECRET = '6589dc67b26199b5396907f5ddb41780';
    var url = `https://api.weixin.qq.com/sns/jscode2session?appid=${APPID}&secret=${APPSECRET}&js_code=${code}&grant_type=authorization_code`

    getData(url, function (data) {
        const session_key = JSON.parse(data).session_key;
        console.log('data', data)
        const skey = encryptSha1(session_key);
        res.send(successResponse({ skey: skey}, '登录成功'))
    })
})


function encryptSha1(data) {
    return crypto.createHash('sha1').update(data, 'utf8').digest('hex')
}

function successResponse(data, msg = '') {
    return { code: 0, msg: msg, data: data }
}

app.use(express.static('public'));
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

