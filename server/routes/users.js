var express = require('express');
var router = express.Router();
var User = require('./../models/user');
var LeaveMsg = require('./../models/leavemsg');
var Goods = require('./../models/goods');
var fs = require('fs'); 
var multer = require('multer');
var svgCaptcha = require('svg-captcha');
var upload = multer({
  dest: 'uploads'
});
require('./../util/util')
const mongoose = require('mongoose')
const formidable = require('formidable')
const confirmLogin = require('../middleware/confirmLogin')
const Articles = require('../models/article')
const path = require('path')

router.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1');
  next();
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//login路由
router.post('/login', function(req, res, next) {
  let password = req.body.userPwd;
  password = require('crypto').createHash('md5').update(password).digest('hex');
  var param = {
    userId: req.body.userId,
    userPwd: password
  };
  User.findOne(param, function(err, doc) {
    if (!doc) {
      res.json({
        status: '1',
        //msg: err.message,
        result: ''
      });
    } else {
      if (doc) {
        //写入cookie  (cookieName,value,params)
        res.cookie('userId', doc.userId, {
          path: '/',
          //存放时长，单位毫秒
          maxAge: 1000 * 60 * 60 * 10
        });
        res.cookie('userName', doc.userName, {
          path: '/',
          maxAge: 1000 * 60 * 60 * 10
        });
        res.cookie('userObjectId', doc._id, {
          path: '/',
          maxAge: 1000 * 60 * 60 * 10
        });
        let userIco = doc.userIco;
        if (userIco == '') {
          userIco = "defaultUser.png"
        }
        res.cookie('userIco', userIco, {
          path: '/',
          maxAge: 1000 * 60 * 60 * 10
        });
        //存入session
        //req.session.user = doc;
        res.json({
          status: '0',
          msg: '',
          result: {
            //返回登陆成功的用户名
            userName: doc.userName,
            userIco: userIco
          }
        });
      }
    }
  });
});
// loginout路由
router.post("/logout", function(req, res, next) {
  res.cookie("userId", '', {
    path: '/',
    maxAge: -1
  });
  res.json({
    status: '0',
    msg: '',
    result: ''
  });
});

//用户注册接口 
router.post('/register', function(req, res, next) {
  let nickName = req.body.newUserNickName;
  let userId = req.body.newUserId;
  let password = req.body.newUserPwd;
  password = require('crypto').createHash('md5').update(password).digest('hex');
  //console.log(password);
  let newUserInfo = {
    userId: userId,
    userName: nickName,
    userPwd: password
  };
  let newUser = new User(newUserInfo);
  newUser.save(function(err) {
    if (err) {
      res.json({
        status: '10007',
        msg: err.message,
        result: ''
      })
    } else {
      res.json({
        status: '0',
        msg: '',
        result: ''
      })
    }
  })
});

//验证码生成接口
router.get('/captcha', function(req,res,next) {
  var captcha = svgCaptcha.create();
  console.log(captcha.text);
  res.cookie('captcha', captcha.text, {
    path: '/',
    maxAge: 1000 * 60 * 60
  });
	res.type('svg');
	res.status(200).send(captcha.data);
});

//注册验证接口
router.post('/checkRegister', function(req,res,next) {
  let userId = req.body.userId;
  let capInput = req.body.capInput;
  User.findOne({userId: userId}, function(err,doc) {
    if(doc) {
      res.json({
        status: '1',
        msg: '该账号已经被注册！',
        result: ''
      })
    } else {
      if(capInput == req.cookies.captcha) {
        res.json ({
          status: '0',
          msg: '',
          result: ''
        })
      } else {
        res.json({
          status: '1',
          msg: '验证码输入错误！',
          result: ''
        });
      }
    }
  })

})
//回传昵称，用户头像接口
router.get('/checkLogin', function(req, res, next) {
  if (req.cookies.userId) {
    res.json({
      status: '0',
      msg: '',
      result: {
        userName: req.cookies.userName || '',
        userIco: req.cookies.userIco,
        userId: req.cookies.userId,
        userObjectId: req.cookies.userObjectId
      }
    });
  } else {
    res.json({
      status: '1003',
      msg: 'Not logged in',
      result: ''
    });
  }
});


//查询购物车数量接口
router.get("/getCartCount", function(req, res, next) {
  if (req.cookies && req.cookies.userId) {
    //console.log("userId:"+req.cookies.userId);
    var userId = req.cookies.userId;
    User.findOne({
      "userId": userId
    }, function(err, doc) {
      if (err) {
        res.json({
          status: "0",
          msg: err.message
        });
      } else {
        let cartList = doc.cartList;
        let cartCount = 0;
        cartList.forEach(function(item) {
          cartCount += parseFloat(item.productNum);
        });
        res.json({
          status: "0",
          msg: "",
          result: cartCount
        });
      }
    });
  } else {
    res.json({
      status: "0",
      msg: "当前用户不存在"
    });
  }
});


//查询当前用户名下的购物车数据路由
router.get('/cartList', function(req, res, next) {
  var userId = req.cookies.userId;
  User.findOne({
    userId: userId
  }, function(err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      });
    } else {
      if (doc) {
        res.json({
          status: '0',
          msg: '',
          result: doc.cartList
        });
      }
    }
  });
});

//购物车删除路由
router.post('/cartDel', function(req, res, next) {
  var userId = req.cookies.userId;
  var productId = req.body.productId;
  //console.log(`uid:${userId}   pid:${productId}`);
  User.update({
    userId: userId
  }, {
    $pull: {
      'cartList': {
        'productId': productId
      }
    }
  }, function(err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      });
    } else {
      res.json({
        status: '0',
        msg: '',
        result: 'suc'
      });
    }
  });
});

//购物车商品数量修改
router.post('/cartEdit', function(req, res, next) {
  var userId = req.cookies.userId;
  var productId = req.body.productId;
  var productNum = req.body.productNum;
  var checked = req.body.checked;
  User.update({
    'userId': userId,
    'cartList.productId': productId
  }, {
    'cartList.$.productNum': productNum,
    'cartList.$.checked': checked
  }, function(err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      });
    } else {
      res.json({
        status: '0',
        msg: '',
        result: 'suc'
      });
    }
  });
});

//全选购物车商品
router.post('/editCheckAll', function(req, res, next) {
  var userId = req.cookies.userId;
  var checkAll = req.body.checkAll ? '1' : '0';
  User.findOne({
    'userId': userId
  }, function(err, user) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      });
    } else {
      if (user) {
        user.cartList.forEach(function(item) {
          item.checked = checkAll;
        });
        user.save(function(err1, doc) {
          if (err1) {
            res.json({
              status: '1',
              msg: err.message,
              result: ''
            });
          } else {
            res.json({
              status: '0',
              msg: '',
              result: 'suc'
            });
          }
        });
      }
    }
  });
});

//查询用户地址接口
router.get('/addressList', function(req, res, next) {
  var userId = req.cookies.userId;
  User.findOne({
    'userId': userId
  }, function(err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      });
    } else {
      res.json({
        status: '0',
        msg: '',
        result: doc.addressList
      });
    }
  });
});

//设置默认地址接口
router.post('/setAdsDefault', function(req, res, next) {
  var userId = req.cookies.userId,
    addressId = req.body.addressId;
  if (!addressId) {
    res.json({
      status: '1005',
      msg: 'addressId is null',
      result: ''
    });
  } else {
    User.findOne({
      'userId': userId
    }, function(err, doc) {
      if (err) {
        res.json({
          status: '1',
          msg: err.message,
          result: ''
        });
      } else {
        var addressList = doc.addressList;
        addressList.forEach(function(item) {
          if (item.addressId == addressId) {
            item.isDefault = true;
          } else {
            item.isDefault = false;
          }
        });
        doc.save(function(err1, doc1) {
          if (err1) {
            res.json({
              status: '1',
              msg: err1.message,
              result: ''
            });
          } else {
            res.json({
              status: '0',
              msg: '',
              result: doc.addressList
            });
          }
        });
      }
    });
  }

});

//新增地址接口
router.post('/addAddress', (req,res,next) => {
  let userId = req.cookies.userId,
      userName = req.body.userName,
      streetName = req.body.streetName,
      tel = req.body.tel,
      postCode = req.body.postCode,
      isDefault = false;
  User.findOne({userId: userId}, (err,doc) => {
    if(err) {
      throw err
    } else {
      let rd1 = Math.floor(Math.random() * 10);
      let rd2 = Math.floor(Math.random() * 10);
      let addressId = rd1 + new Date().getTime() + rd2;
      let newAddtrees = {
        addressId: addressId,
        userName: userName,
        streetName: streetName,
        postCode: postCode,
        tel: tel,
        isDefault: isDefault
      }
      doc.addressList.push(newAddtrees);
      doc.save((err1) => {
        if(err1) {
          res.json({
            status: '1',
            msg: err1.message,
            result: ''
          })
        } else {
          res.json({
            status: '0',
            msg: '',
            result: ''
          })
        }
      })
    }
  })
})

//删除地址接口
router.post('/delAddress', function(req, res, next) {
  var userId = req.cookies.userId,
    addressId = req.body.addressId;
  User.update({
    'userId': userId
  }, {
    $pull: {
      'addressList': {
        'addressId': addressId
      }
    }
  }, function(err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      });
    } else {
      res.json({
        status: '0',
        msg: '',
        result: ''
      });
    }
  });
});

//订单生成接口
router.post("/payMent", function(req, res, next) {
  var userId = req.cookies.userId,
    addressId = req.body.addressId,
    orderTotal = req.body.orderTotal;
  User.findOne({
    'userId': userId
  }, function(err, doc) {
    if (err) {
      res.json({
        status: "1",
        msg: err.message,
        result: ''
      });
    } else {
      var address = '',
        goodsList = [];
      //获取当前用户的地址信息
      doc.addressList.forEach((item) => {
        if (addressId == item.addressId) {
          address = item;
        }
      })
      //获取用户购物车的购买商品
      doc.cartList.filter((item) => {
        if (item.checked == '1') {
          goodsList.push(item);
        }
      });

      var platform = '233';
      var rd1 = Math.floor(Math.random() * 10);
      var rd2 = Math.floor(Math.random() * 10);

      var sysDate = new Date().Format('yyyyMMddhhmmss');
      var createDate = new Date().Format('yyyy-MM-dd hh:mm');
      var orderId = platform + rd1 + sysDate + rd2;
      var order = {
        orderId: orderId,
        orderTotal: orderTotal,
        addressInfo: address,
        goodsList: goodsList,
        orderStatus: '1',
        createDate: createDate
      };

      doc.orderList.push(order);
      doc.save(function(err1, doc1) {
        if (err1) {
          res.json({
            status: "1",
            msg: err.message,
            result: ''
          });
        } else {
          User.update({ userId: userId }, { $pull: { cartList: {} } } ,(err,doc) => {
            if(err) {
              console.log(err)
            }
          });
          res.json({
            status: "0",
            msg: '',
            result: {
              orderId: order.orderId,
              orderTotal: order.orderTotal
            }
          });
        }
      });
    }
  })
});

//清空购物车接口
router.post('/emptyCart', confirmLogin, (req,res) => {
  let userId = req.cookies.userId;
  User.update({ userId: userId }, { $pull: {cartList: {}}}, (err,doc) => {
    if(err) {
      console.log(err)
    }
  })
})

//根据订单ID查询订单信息
router.get('/orderDetail', function(req, res, next) {
  var userId = req.cookies.userId,
    orderId = req.param('orderId');
  User.findOne({
    'userId': userId
  }, function(err, userDoc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      });
    } else {
      var orderList = userDoc.orderList;
      if (orderList.length > 0) {
        var orderTotal = 0;
        orderList.forEach((item) => {
          if (item.orderId == orderId) {
            orderTotal = item.orderTotal
          }
        });
        if (orderTotal) {
          res.json({
            status: '0',
            msg: '',
            result: {
              orderId: orderId,
              orderTotal: orderTotal
            }
          });
        } else {
          res.json({
            //有该订单但是没有查到
            status: '10005',
            msg: 'not exist ordertList info',
            result: ''
          });
        }

      } else {
        res.json({
          //没有创建订单
          status: '10006',
          msg: 'have not created this order',
          result: ''
        });
      }
    }
  });
});

//头像上传接口
router.post('/uploads', upload.array('imageFile', 5), function(req, res, next) {
  let userId = req.body.userId;
  let userIco = userId  + '.png';
  for (var i = 0; i < req.files.length; i++) {
    fs.rename(req.files[i].path, "public/images/userico/" + userIco, function(err) {
      if (err) {
        throw err;
      }
    })
  }
  User.update({'userId': userId}, {$set:{'userIco': userIco}}, (err) => {
    if(err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      res.cookie('userIco', userIco, {
        path: '/',
        maxAge: 1000 * 60 * 60
      });
    }
  })
  let uimg = req.cookies.userId + 'png';
  res.cookie('userIco', uimg, {
    path: '/',
    maxAge: 1000 * 60 * 60
  });
});

//用户昵称修改接口
router.post('/updateUserName', (req,res,next)=> {
  let userId = req.cookies.userId,
      newUserName = req.body.newUserName,
      conditions = {'userId': userId},
      updates = {$set:{'userName': newUserName}};
  User.update(conditions,updates,(err)=> {
    if(err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else{
      res.cookie('userName', newUserName, {
        path: '/',
        maxAge: 1000 * 60 * 60
      });
      res.json({
        status: '0',
        msg: '',
        result: ''
      })
    }
  })
})

//商品留言接口
router.post('/addLeaveMsg', (req,res) => {
  let goods = req.body.goods,
      from = req.cookies.userObjectId,
      to = req.body.to,
      content = req.body.content;
  let msgInfo = {
      goods: goods,
      from: from,
      to: to,
      content: content
  };
  let newLeaveMsg = new LeaveMsg(msgInfo);
  newLeaveMsg.save((err) => {
    if(err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      res.json({
        status: '0',
        msg: '',
        result: ''
      })
    }
  })
})

//获取订单列表接口
router.get('/getOrderList', (req,res) => {
  let userId = req.cookies.userId;
  User.findOne({userId: userId}, (err,doc) => {
    if(err) {
      throw err
    } else {
      res.json({
        status: '0',
        msg: '',
        result: doc.orderList
      })
    }
  })
})

//删除订单接口 
router.post('/delOrder', (req,res) => {
  let userId = req.cookies.userId,
      orderId = req.body.orderId;
  User.update({userId: userId}, {$pull: {orderList: {orderId: orderId}}}, (err,doc) => {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      });
    } else {
      res.json({
        status: '0',
        msg: '',
        result: 'suc'
      });
    }
  });
});

//修改密码接口
router.post('/updatePwd', (req,res) => {
  let userId = req.cookies.userId,
      newUserPwd = req.body.newUserPwd;
  newUserPwd = require('crypto').createHash('md5').update(newUserPwd).digest('hex');
  User.update({userId: userId}, {$set:{userPwd: newUserPwd}}, err => {
    if(err) {
      throw err
    } else {
      res.json({
        status: '0',
        msg: '',
        result: 'suc'
      })
    }
  })
})

//商品发布标题图片处理接口
router.post('/goodsUploads', (req,res) => {
  const form = new formidable.IncomingForm();
  form.uploadDir = 'uploads';
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if(err) {
      console.log(err)
    }
    let rd = new Date().Format('yyyyMMddhhmmss');
    let rd2 = Math.floor(Math.random() * 10);
    let rd3 = Math.floor(Math.random() * 100);
    let oldPath = files.uploadImg.path;
    let fileName = files.uploadImg.name;
    let index = fileName.lastIndexOf('.');
    let extentName = fileName.slice(index);
    let newPath = rd + rd2 + rd3 + extentName;
    fs.rename(oldPath, "public/images/goods/" + newPath, (err) => {
      if(err) {
        console.log(err)
      }
    })
    res.json({
      status: '0',
      msg: '',
      result: [newPath]
    })
  })
 
})

//发布商品接口
router.post('/publishGoods', confirmLogin, (req,res) => {
  let owner = req.cookies.userObjectId,
      productName = req.body.goodsName,
      salePrice = req.body.salePrice,
      productImage = req.body.productImage,
      sellerIntro = req.body.sellerIntro,
      previewImg = req.body.previewImg,
      _id = new mongoose.Types.ObjectId();
  let productId = new Date().Format('yyyyMMddhhmmss') + Math.floor(Math.random() * 100) + Math.floor(Math.random() * 100);
  let goodsInfo = {
    _id,
    productId,
    productName,
    salePrice,
    productImage,
    publishDate: Date(),
    sellerIntro,
    owner,
    previewImg
  }
  let newGoods = new Goods(goodsInfo);
  console.log('_id：'+ _id);
  newGoods.save((err) => {
    if(err) {
      console.log(err)
    } else {
      User.findById(owner, (err2,doc) => {
        if(doc) {
          doc.saleList.push(_id);
          doc.save((err) => {
            if(err) {
              console.log(err)
            } else {
              res.json({
                status: '0',
                msg: '',
                result: 'suc'
              })
            }
          })
        }
      })     
    }
  })
})

//回传用户已出货列表
router.get('/getSaleList', (req,res) => {
  let id = req.cookies.userObjectId;
  // let id = "5aa20b4a8d654e0cc0b24f09";
  User.findById(id)
      .populate('saleList')
      .exec((err, doc) => {
        if(err) {
          console.log(err)
        } else {
          res.json({
            status: '0',
            msg: '',
            result: doc.saleList
          })
        }
      })
});

//删除已发布接口
router.post('/delSale',confirmLogin, (req,res) => {
  let saleItemId = req.body.saleItemId;
  let userId = req.cookies.userId;
  console.log(saleItemId)
  User.update({ 'userId': userId }, { $pull: { 'saleList': saleItemId}}, {multi: true })
    .exec((err,doc) => {
      if(err) {
        console.log(err)
      } else {
        Goods.remove({ '_id': saleItemId}, (err,result) => {
          if(err) {
            console.log(err)
          } else {
            res.json({
              status: '0',
              msg: '',
              result: 'suc'
            })
          }
        })
      }
    })
})

//个人中心消息列表回传接口(接收到)
router.get('/getTome', confirmLogin, (req,res) => {
  let aid = req.cookies.userObjectId;
  LeaveMsg.find({to: aid})
          .populate('from', 'userName userIco')
          .populate('to', 'userName userIco')
          .populate('goods', 'productName productImage')
          .sort({sendDate: -1})
          .exec((err, doc) => {
            if(err) {
              console.log(err)
            } else {
              res.json({
                status: '0',
                msg: '',
                result: doc
              })
            }
          }) 
})

//个人中心消息列表回传接口(发送的)
router.get('/getToOther', confirmLogin, (req, res) => {
  let aid = req.cookies.userObjectId;
  LeaveMsg.find({ from: aid })
    .populate('from', 'userName userIco')
    .populate('to', 'userName userIco')
    .populate('goods', 'productName productImage')
    .sort({ sendDate: -1 })
    .exec((err, doc) => {
      if (err) {
        console.log(err)
      } else {
        res.json({
          status: '0',
          msg: '',
          result: doc
        })
      }
    })
})

//获取具体留言
router.get('/getMsgDetail', confirmLogin, (req,res) => {
  let msgId = req.query.msgId;
  LeaveMsg.findOne({_id: msgId})
          .populate('from', 'userIco userName')
          .populate('to', 'userIco userName')
          .populate('reply.from', 'userIco userName')
          .populate('reply.to', 'userIco userName')
          .exec((err,doc) => {
            if(err) {
              console.log(err)
            }else {
              res.json({
                status: '0',
                msg: '',
                result: doc
              })
            }
          })
}) 

//个人中心，我的文章信息回传接口
router.get('/getMyArticle', confirmLogin, (req,res) => {
  let userId = req.cookies.userObjectId;
  Articles.find({publisher: userId}, (err,doc) => {
    if(err) {
      console.log(err)
    }else {
      res.json({
        status: '0',
        msg: '',
        result: doc
      })
    }
  })
})

//文章修改（已经迁移到articles路由下）

//删除文章接口

router.post('/delArticle', confirmLogin, (req,res) => {
  let articleId = req.body.articleId;
  Articles.remove({_id: articleId}, (err, result) => {
    if(err) {
      console.log(err)
    }else {
      res.json({
        status: '0',
        result: 'suc'
      })
    }
  })
})

//留言回复
router.post('/addMsgReply', confirmLogin, (req, res) => {
  let msgId = req.body.msgId,
      from = req.cookies.userObjectId,
      to = req.body.to,
      content = req.body.content;
  LeaveMsg.findOne({_id: msgId}, (err,doc) => {
    if(doc) {
      doc.reply.push({from,to,content});
      doc.save(err => {
        if(err) {
          console.log(err)
        }else {
          res.json({
            status: '0',
            result: 'suc'
          })
        }
      })
    } 
  })
})

//获取用户中心点赞接口
router.get('/getMylike', confirmLogin, (req,res) => {
  const uid = req.cookies.userObjectId;
  User.findById(uid)
      .populate('likeList')
      // .populate('likeList', 'publisher.userName')
      .exec((err,doc) => {
        if (err) {
          res.json({
            status: '1',
            err: err.message,
            result: ''
          })
        } else {
          res.json({
            status: '0',
            err: '',
            result: doc.likeList
          })
        }
      })

})

//删除我的收藏
router.delete('/delLike/:lid', confirmLogin, async(req,res,next) => {
  const lid =req.params.lid;
  const uid = req.cookies.userObjectId;
  await User.update({'_id': uid}, {$pull:{'likeList': lid}}).exec((err,result) => {
    if(err) {
      console.log(err)
    }else {
      res.json({
        status: '0',
        msg: '',
        result: 'suc'
      })
    }
  })
})

//修改我的发布的商品
router.post('/updateGoods/:gid', confirmLogin, (req,res,next) => {
  const gid = req.params.gid;
  const owner = req.cookies.userObjectId,
        productName = req.body.goodsName,
        salePrice = req.body.salePrice,
        productImage = req.body.productImage,
        sellerIntro = req.body.sellerIntro,
        updateDate = Date(),
        status = 'untreated';
        previewImg = req.body.previewImg;
  if(previewImg.length == 0) {
    Goods.findOneAndUpdate({ productId: gid }, { owner, productName, salePrice, productImage, sellerIntro, updateDate,  status}, (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.json({
          status: '0',
          result: 'suc'
        })
      }
    })
  }else {
    Goods.findOneAndUpdate({ productId: gid }, { owner, productName, salePrice, productImage, sellerIntro, updateDate, previewImg}, (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.json({
          status: '0',
          result: 'suc'
        })
      }
    })
  }
})

router.get('/test', (req,res) => {
  User.find((err,doc) => {
    res.json({
      result: doc
    })
  })
  
});


module.exports = router;
