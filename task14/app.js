var express = require('express');
var mysql = require('mysql');
var path = require('path');
var bodyParser = require('body-Parser');
var xss = require('xss');

var app = express();
app.use(bodyParser.json({ limit: '1mb' })); //body-parser 解析json格式数据
app.use(bodyParser.urlencoded({ //此项必须在 bodyParser.json 下面,为参数编码
    extended: true
}));

app.use(express.static(path.join(__dirname, 'public')));

// 链接数据库
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'phplesson'
});

connection.connect();


//推荐 栏目
app.get('/server/tuijian', function(req, res) {
    // res.send('Hello World!');


    //查询数据库
    connection.query('select * from news where lanmu = "tuijian"', function(err, rows) {
        if (err) throw err;
        res.send(rows);
        console.log("\n推荐数据推送成功\n");
    });

});

//百家 栏目
app.get('/server/baijia', function(req, res) {

    //查询数据库
    connection.query('select * from news where lanmu = "baijia"', function(err, rows) {
        if (err) throw err;
        res.send(rows);
        console.log("\n百家数据推送成功\n");
    });


});

//增加新闻
app.post('/server/addnews', function(req, res) {
    var json = req.body;
//输入内容检查：引用了xss模块，过滤或者编码敏感字符
    var sql = "INSERT INTO news SET  newstitle='" + xss(json.newstitle) + "', newsimg='" + xss(json.newsimg) + "',newscontent='" + xss(json.newscontent) + "',addtime='" + json.addtime + "',lanmu='" + xss(json.lanmu) + "'";
    connection.query(sql, function(error, results) {
        if (error) {
            console.log("插入记录出错: " + error.message);
            return;
        }
        res.send(results);
        console.log('添加成功');
        console.log('Inserted: ' + results.affectedRows + ' row.'); //affectedRows函数返回前一次 MySQL 操作所影响的记录行数
        console.log('Id inserted: ' + results.insertId); //insertId函数返回上一步 INSERT 操作产生的 ID
    });

});

//删除新闻
app.post('/server/delnews', function(req, res) {
    var newsid = req.body.newsid;
    console.log(newsid);

    var sql = "delete from news where newsid='"+newsid+"'";
    connection.query(sql,function(error, results) {
        if (error) {
            console.log("插入记录出错: " + error.message);
            return;
        }
        res.send(results);
        console.log('删除成功');
    });
});

//修改新闻
app.post('/server/renew', function(req, res) {
    var json = req.body;
    //输入内容检查：引用了xss模块，使用xss()方法，过滤或者编码敏感字符
    var sql = "update news set newstitle='" + xss(json.newstitle) + "', newsimg='" + xss(json.newsimg) + "',newscontent='" + xss(json.newscontent) + "',addtime='" + json.addtime + "',lanmu='" + xss(json.lanmu) + "' where newsid='" + json.newsid + "'";
    connection.query(sql, function(error, results) {
        if (error) {
            console.log("插入记录出错: " + error.message);
            return;
        }
        res.send(results);
        console.log('修改成功');
        console.log('Inserted: ' + results.affectedRows + ' row.'); //affectedRows函数返回前一次 MySQL 操作所影响的记录行数
        console.log('Id inserted: ' + results.insertId); //insertId函数返回上一步 INSERT 操作产生的 ID
    });


});

//修改新闻  ---原始数据

app.get('/server/updatanews', function(req, res) {
    var id = req.query.newsid;
    console.log(id);

    var sql = "select * from news where newsid='" + id + "'";
    connection.query(sql, function(error, results) {
        if (error) {
            console.log("插入记录出错: " + error.message);
            return;
        }
        res.send(results);
        console.log('修改成功');
        console.log(results);
    });

});

//服务 监听端口
var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});
