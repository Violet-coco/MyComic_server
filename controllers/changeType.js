
//1, 引入模块
var Type = require('../dao/dao_changeType');

exports.selectType = function (req, res) {
    //2,创建对象
    var typeName = new Type();
    typeName.init();
    var typeNamesql = "select * from type";
    typeName.queryAll(typeNamesql, function (typeName) {
        res.render('changeType', {
            typeName: typeName,
        });
    });

};


exports.updateType = function (req, res) {

    // 修改
    var name = req.body.name;
    var index = req.body.Index;

    //2,创建对象
    var typeUpdate = new Type();
    typeUpdate.init();

    var typeUpdatesql = "UPDATE type SET TypeName = '" + name + "' where TypeID=" + index;
    typeUpdate.update(typeUpdatesql);

};


exports.deleteType = function (req, res) {

// 删除
        var typeID = req.body.id;
        //2,创建对象
        var deletetype = new Type();
        deletetype.init();
        var deletetypesql = "delete from type where TypeID=" + typeID;
        deletetype.queryAll(deletetypesql, function (deletetype) {
        });
        res.redirect('/index');

};


exports.insertType = function (req, res) {
        //插入
        var type_name = req.body.type_name;
        var type_sql = "insert into type(TypeName)values(?)";
        var type_params = [type_name];
//2,创建对象
        var type_add = new Type();
        type_add.init();
        type_add.insert(type_sql, type_params);
        res.redirect('/index');

};