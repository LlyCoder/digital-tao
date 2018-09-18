var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var fs = require('fs');
var path = require('path');
const mongoose = require('mongoose')
const Articles = require('../models/article')
const Comments = require('../models/comment')
const User = require('./../models/user');
const confirmLogin = require('../middleware/confirmLogin')

router.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1');
  next();
});

//获取文章列表接口 llycoder
router.get('/getList', (req,res) => {
  let page = parseInt(req.query.page);
  let pageSize = parseInt(req.query.pageSize);
  let skip = (page-1) * pageSize;
  let totalCount = 0;
  Articles.count({status: 'pass'},(err,count) => {
    totalCount = count;
  })
  let artcileModel = Articles.find({status: 'pass'}).populate('publisher', 'userName');
  artcileModel.skip(skip).limit(pageSize).sort({'publishDate': -1}).exec((err,doc) => {
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
        result: {
          totalCount: totalCount,
          count: doc.length,
          list: doc
        }
      });
    }
  })
})

//获取文章详情接口
router.get('/getDetail', (req,res) => {
  let id = req.query.id;
  Articles.findById(id).populate('publisher', 'userName').exec((err,doc) => {
    if(err) {
      console.log(err.message)
    } else {
      res.json({
        status: '0',
        msg: '',
        result: doc
      })
    }
  })
})

//检测用户已经为改文章点赞
router.get('/chekLiked', confirmLogin, (req,res) => {
  let aid = req.query.aid;
  let uid = req.cookies.userObjectId;
  User.findById(uid, (err,doc) => {
    if(doc) {
      let ex = doc.likeList.indexOf(aid);
      if(ex >= 0) {
        res.json({
          status: '11'      
        })
      } else {
        res.json({
          status: '10'
        })
      }
    }
  })
})

//更新点赞数接口
router.post('/updateLike', confirmLogin, (req,res) => {
  let aid = req.body.articleId;
  let option = req.body.option;
  let uid = req.cookies.userObjectId;
  if(option == 'add') {
    Articles.update({_id: aid}, {$inc:{like: 1}}, (err,result) => {
      if(err) {
        console.log(err)
      }else {
        User.findById(uid, (err,doc) => {
          doc.likeList.push(aid);
          doc.save();
        })
        res.json({
          status: '11',
          msg: 'added'
        })
      }
    })
  }else if (option == 'drop') {
    Articles.update({_id: aid}, {$inc:{like: -1}}, (err,result) => {
      if (err) {
        console.log(err)
      } else {
        User.update({ _id: uid}, { $pull: { 'likeList': aid } }, { multi: true }).exec((err,doc) => {
          if(err) {
            console.log(err)
          }
        }) 
        res.json({
          status: '10',
          msg: 'droped'
        })
      }
    })
  }
  
})


//发布文章接口
router.post('/postArticle', confirmLogin, (req,res) => {
  let articleTitle = req.body.articleTitle,
      abstract = req.body.abstract,
      articleImg = req.body.articleImg,
      publisher = req.cookies.userObjectId,
      content = req.body.content;
  let article = new Articles({
      articleTitle,
      abstract,
      articleImg,
      content,
      publisher,
      publishDate: new Date()
  });
  article.save(err => {
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

//文章修改接口
router.post('/updateArticle', confirmLogin, (req,res) => {
  let articleId = req.body.articleId,
      articleTitle = req.body.articleTitle,
      abstract = req.body.abstract,
      articleImg = req.body.articleImg,
      content = req.body.content,
      updateDate = Date(),
      status = 'untreated';
  Articles.findOneAndUpdate({ _id: articleId }, { articleTitle, abstract, articleImg, content, updateDate, status}, (err,doc) => {
    if(err) {
      console.log(err)
    } else {
      res.json({
        status: '0',
        result: 'suc'
      })
    }
  })
})

//添加评论接口 llycoder
router.post('/addComment', confirmLogin, (req,res) =>{
  let article = req.body.articleId,
    from = req.cookies.userObjectId,
    content = req.body.content,
    //可能不存在
    commentId = req.body.commentId,
    to = req.body.to;
  if (commentId !== null && to !== null) {
    Comments.findById(commentId, (err,doc) => {
      let reply = {
        from,
        to,
        content
      }
      doc.reply.push(reply);
      doc.save((err,comment) => {
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
    })
  }else {
    let comment = new Comments({
      article,
      from,
      content
    });
    comment.save((err,comment) => {
      if (err) {
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

//获取文章下评论接口
router.get('/getComments', (req,res) => {
  const aid = req.query.aid;
  Comments.find({'article': aid})
          .populate('from', 'userName userIco')
          .populate('reply.from reply.to', 'userName userIco')
          .sort({'createAt':-1})
          .exec((err,comments) => {
            if(err) {
              console.log(err)
            }else {
              res.json({
                status: '0',
                msg: '',
                result: comments
              })
            }
          })
})

router.post('/addArticle' ,function (req,res,next) {
  let arContent = req.body.arContent;
  console.log(arContent);
  res.send()
});

router.post('/uploads', function(req, res) {
  var form = new formidable.IncomingForm();
  form.uploadDir = "uploads";
  form.keepExtensions = true;
  form.parse(req, function(err,fields,files) {
    if(err) {
      console.log('err');
    }
    var rd =  new Date().getTime();
    var oldPath = files.uploadImg.path;
    var newPath = Math.floor(Math.random() * 10) + rd + files.uploadImg.name;
    fs.rename(oldPath, "public/images/articles/" + newPath, function(err) {
      if(err) {
        console.log(err)
      }
    }) 
    res.json({
      "errno": 0,
      "data": ['http://localhost:3000/images/articles/'+ newPath]
    })
  })
  
});


//处理文章预览图
router.post('/uploadArImg', function (req, res) {
  var form = new formidable.IncomingForm();
  form.uploadDir = "uploads";
  form.keepExtensions = true;
  form.parse(req, function (err, fields, files) {
    if (err) {
      console.log('err');
    }
    var rd = new Date().getTime();
    var oldPath = files.uploadImg.path;
    var newPath = Math.floor(Math.random() * 10) + rd + files.uploadImg.name;
    fs.rename(oldPath, "public/images/articles/" + newPath, function (err) {
      if (err) {
        console.log(err)
      }
    })
    res.json({
      "errno": 0,
      "data": [newPath]
    })
  })

});

module.exports = router;
