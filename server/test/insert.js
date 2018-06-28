// 引入模块
var mongoose = require('mongoose');
// 连接数据库
mongoose.connect('mongodb://127.0.0.1:27017/mall');
// 设置数据类型

var User = require('./../models/user');
// 选择集合

// 数据集
var content = {userName:"Nick"};
// 实例化对象并插入数据
var monInsert = new User(content);
monInsert.save(function(err){
  if(err){
    console.log(err);
  }else{
    console.log('成功插入数据');
  }
  db.close();
});
