exports.index = function (req, res) {
    //1, 引入模块
    var INDEX = require('../dao/dao_index');
    //2,创建对象
    var typeName = new INDEX();
    typeName.init();
    var typeNamesql = "select * from type";
    typeName.queryAll(typeNamesql, function (typeName) {
        //2,创建对象
        var mycomic = new INDEX();
        mycomic.init();
        //查询菜品分类
        var mycomicsql = "select * from mycomic";
        mycomic.queryAll(mycomicsql, function (mycomic) {
            //2,创建对象
            var sortName = new INDEX();
            sortName.init();
            //查询菜品分类
            var sortNamesql = "select * from sort";
            sortName.queryAll(sortNamesql, function (sortName) {
                res.render('index', {
                    typeName: typeName,
                    mycomic: mycomic,
                    sortName: sortName,
                });
            });
        });
    });


};
exports.deleteindex = function (req, res) {

        var comicID = req.body.id;
        //2,创建对象
        var deletemycomic = new INDEX();
        deletemycomic.init();
        var deletemycomicsql = "delete from mycomic where id=" + comicID;
        deletemycomic.queryAll(deletemycomicsql, function (deletemycomic) {
        });
        res.redirect("/index");
};