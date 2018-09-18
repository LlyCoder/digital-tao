var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Goods = require('../models/goods');
const confirmLogin = require('../middleware/confirmLogin')

mongoose.connect('mongodb://127.0.0.1:27017/mall');
mongoose.connection.on("connected", function () {
  console.log("MongoDB connected success");
});
mongoose.connection.on('error', function () {
  console.log("MongoDB connect fail");
});
mongoose.connection.on('disconnected', function () {
  console.log("MongoDB disconnected");
});
//查询商品列表的路由
router.get('/list', function (req,res,next) {
  var sort = req.param('sort');
  var page = parseInt(req.param('page'));
  var pageSize = parseInt(req.param('pageSize'));
  var priceLevel = req.param('priceLevel');
  var skip = (page-1) * pageSize;
  var priceGt = '';
  var priceLte = '';
  var params = { status: 'pass'};
  if(priceLevel != 'all') {
    switch (priceLevel) {
      case '0': priceGt = 0;priceLte=100;break;
      case '1': priceGt = 100;priceLte=500;break;
      case '2':priceGt = 500;priceLte=1000;break;
      case '3':priceGt = 1000;priceLte=5000;break;
    }
    params = {
      salePrice: {
        $gt: priceGt,
        $lte: priceLte
      },
      status: 'pass' 
    }
  }

  var goodsModel = Goods.find(params)
  .populate('owner', 'userName')
  .skip(skip)
  .limit(pageSize);
  goodsModel.sort({'salePrice': sort});
  goodsModel.exec(function (err,doc) {
    if(err) {
      res.json({
        status: '1',
        msg: err.message
      });
    } else {
      res.json({
        status: '0',
        msg: '',
        result: {
          count: doc.length,
          list: doc
        }
      });
    }
  });
});
//加入购物车路由
router.post("/addCart", function (req,res,next) {
  var userId = req.cookies.userId;
  var productId = req.body.productId;
  var User = require('./../models/user');
  User.findOne({userId: userId}, function(err,userDoc) {
    if(err) {
      res.json({
        status: '1',
        msg: err.message
      });
    } else {
      //console.log(`userDoc: ${userDoc}`);
      if(userDoc) {
        //逻辑：用户存在，用户添加相同商品，不再加入新文档，而是累加产品数量（productNum）
        let goodsItem = '';
        userDoc.cartList.forEach(function (item) {
          if(item.productId == productId) {
            goodsItem = item;
            item.productNum++;
          }
        });
        if(goodsItem) {
          userDoc.save(function (err2,doc2) {
             if(err2){
               res.json({
                 status:"1",
                 msg:err2.message
               })
             }else{
               res.json({
                 status:'0',
                 msg:'',
                 result:'suc'
               })
             }
           });
        } else {
          Goods.findOne({productId: productId}, function(err1,doc) {
            if(err1) {
              res.json({
                status: '1',
                msg: err1.message
              })
            }else {
                if(doc) {
                  doc.productNum = 1;
                  doc.checked = 1;
                  userDoc.cartList.push(doc);
                  userDoc.save(function (err2,doc2) {
                    if(err2) {
                      res.json({
                        status: '1',
                        msg: err2.message
                      });
                    } else {
                        res.json({
                          status: '0',
                          msg: '',
                          result: 'success'
                        });
                    }
                  });
                }
              }
          });
        }
      }
    }
  });
});

//商品模糊搜索接口
router.get('/searchList', function (req,res,next) {
  let searchInput = req.param('searchInput');
  Goods.find({'productName':{$regex: new RegExp('['+searchInput+']'+'{1,}')}})
        .populate('owner', 'userName')
        .exec((err,doc) => {
          if(err) {
            res.json({
              status: 1,
              msg: err.message,
              result: ''
            })
          } else {
            res.json({
              status: 0,
              msg: '',
              result: doc
            })
          }
        })
  })

  //获取商品详情接口
  router.get('/goodsDetail', function(req,res,next) {
    let productId = req.query.productId;
    Goods.findOne({productId: productId})
          .populate('owner', 'userName')
          .exec((err,doc) => {
            if(err) {
              res.json({
                status: 1,
                msg: err.message,
                result: ''
              })
            } else {
              res.json({
                status: 0,
                msg: '',
                result: doc
              })
            }
          })
   
  })


  //测试
  router.get('/test', confirmLogin, (req,res) => {
    res.end('logined')
  })


module.exports = router;
