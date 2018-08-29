

//1, 引入模块
var INSERT = require('../dao/dao_insertComic');
exports.selectItem = function (req, res) {
    //2,创建对象
    var typeName = new INSERT();
    typeName.init();
    var typeNamesql = "select * from type";
    typeName.queryAll(typeNamesql, function (typeName) {
        //2,创建对象
        var sortName = new INSERT();
        sortName.init();
        //查询菜品分类
        var sortNamesql = "select * from sort";
        sortName.queryAll(sortNamesql, function (sortName) {
            res.render('insertComic', {
                sortName: sortName,
                typeName: typeName
            });
        });
    });
};

exports.insertComic = function (req, res) {
    // 获得数据
    // 漫画名称
    var name = req.body.name;
    var author = req.body.author;
    var author2 = req.body.author2;
    var author3 = req.body.author3;
    var hot = req.body.hot;
    var popular = req.body.popular;
    var comment = req.body.comment;
    var attention = req.body.attention;
    var likes = req.body.likes;
    var sort1 = req.body.sort;
    var sort2 = req.body.sort1;
    var sort3 = req.body.sort2;
    var type = req.body.type;
    var state = req.body.state;
    var count = req.body.count;
    var detailsImgUrl = req.body.detailsImgUrl;
    var introduction = req.body.introduction;
    //2,创建对象
    var comic = new INSERT();
    comic.init();
    var comicsql = "insert into mycomic(name,author,author2,author3" +
        ",hot,popular,comment,attention,likes,sort1,sort2,sort3" +
        ",type,state,count,details,large,intervals,recommend,indexother,introduction)" +
        " values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
    var comicparams = [name, author, author2, author3, hot, popular, comment, attention, likes, sort1, sort2, sort3, type, state, count, detailsImgUrl,detailsImgUrl,detailsImgUrl,detailsImgUrl,detailsImgUrl, introduction];
    comic.insert(comicsql, comicparams);
     res.redirect("insertComic");
};




var fs = require("fs");
// 引入模块
var COS = require('cos-nodejs-sdk-v5');
var cos = new COS({
    // 必选参数
    SecretId: "AKIDtgHguyESzPehYDD8LMBoHvSehZLv21LV",
    SecretKey: "84oNlx0sY2NcgaIrFVZWItIYdWFxVr21",
});



exports.uploadIMG =  function (req, res) {
    var filepath = req.files[0].path;
    console.log(filepath);
    var fileKey = "mycomic" + new Date().getTime();
    // 调用方法
    cos.putObject({
        Bucket: "mycomic-1257212660", /* 必须 */ // Bucket 格式：test-1250000000
        Region: "ap-chengdu",
        Key: fileKey, /* 必须 */
        TaskReady: function (tid) {
        },
        onProgress: function (progressData) {

        },
        // 格式1. 传入文件内容
        // Body: fs.readFileSync(filepath),
        // 格式2. 传入文件流，必须需要传文件大小
        Body: fs.createReadStream(filepath),
        ContentLength: fs.statSync(filepath).size
    }, function (err, data) {
        if (data.statusCode == 200) {
            var url = cos.getObjectUrl({
                Bucket: "mycomic-1257212660", // Bucket 格式：test-1250000000
                Region: "ap-chengdu",
                Key: fileKey,
                Expires: 600000,
                Sign: true,
            }, function (err, data) {
            });
            var body = {
                key: fileKey,
                url: url
            }
            res.json(body);
        }
    });
};