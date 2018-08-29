/**
 * Created by boy on 2017/7/10.
 */
var express = require("express");

var app = express();


var bodyParser = require('body-parser');

var multer = require('multer');

//handle request entity too large
app.use(bodyParser.json({limit:'50mb'}));
app.use(bodyParser.urlencoded({limit:'50mb',extended:true}));


//设置静态文件
app.use(express.static('public'));
//指定模板引擎
app.set("view engine", 'ejs');
//指定模板位置
app.set('views', __dirname + '/views');
//接受表单的请求
app.use(bodyParser.urlencoded({ extended: false }));
var index = require('./controllers/index');
app.get('/index', index.index);
app.post('/index', index.index);
app.post('/deleteindex', index.deleteindex);



var changeComic = require('./controllers/changeComic');
app.post('/changeComic', changeComic.changeComic);
app.get('/changeComic', changeComic.changeComic);

var changeSort = require('./controllers/changeSort');
app.post('/insertSort', changeSort.insertSort);
app.post('/updateSort', changeSort.updateSort);
app.post('/deleteSort', changeSort.deleteSort);
app.get('/changeSort', changeSort.selectSort);


var changeType = require('./controllers/changeType');
app.post('/insertType', changeType.insertType);
app.post('/updateType', changeType.updateType);
app.post('/deleteType', changeType.deleteType);
app.get('/changeType', changeType.selectType);



var insertComic = require('./controllers/insertComic');
app.post('/insertComic', insertComic.insertComic);
app.post('/uploadIMG',multer({dest: __dirname + '/public/upload/'}).array('file'), insertComic.uploadIMG);
app.get('/insertComic', insertComic.selectItem);

app.listen(8888);