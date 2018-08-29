exports.changeComic = function(req, res){
    var index = req.body.index;
    var name = req.body.name;
    var author = req.body.author;
    var author2 = req.body.author2;
    var author3 = req.body.author3;
    var hot = req.body.hot;
    var popular = req.body.popular;
    var comment = req.body.comment;
    var attention = req.body.attention;
    var likes = req.body.likes;
    var sort1 = req.body.sort1;
    var sort2 = req.body.sort2;
    var sort3 = req.body.sort3;
    var type = req.body.type;
    var state = req.body.state;
    var count = req.body.count;
    var detailsImgUrl = req.body.detailsImgUrl;
    var largeImgUrl = req.body.largeImgUrl;
    var intervalImgUrl = req.body.intervalImgUrl;
    var recommendImgUrl = req.body.recommendImgUrl;
    var indexImgUrl = req.body.indexImgUrl;
    var introduction = req.body.introduction;
    //1, 引入模块
    var UPDATE = require('../dao/dao_changeComic');
    //2,创建对象
    var comic = new UPDATE();
    comic.init();

    var comicsql="UPDATE mycomic SET name = '"+name+"',author = '"+author+"',author2 = '"+author2+
        "',author3 = '"+author3+"',hot = '"+hot+"',popular = '"+popular+"',comment = '"+comment+
        "',attention = '"+attention+"',likes = '"+likes+"',sort1 = '"+sort1+"',sort2 = '"+sort2+
        "',sort3 = '"+sort3+"',type = '"+type+"',state = '"+state+"',count = '"+count+
        "',details = '"+detailsImgUrl+"',large = '"+largeImgUrl+"',intervals = '"+intervalImgUrl+
        "',recommend = '"+recommendImgUrl+"',indexother = '"+indexImgUrl+"',introduction='"+introduction+
        "' WHERE id = "+index;

    comic.update(comicsql);
    res.redirect('/index');
};