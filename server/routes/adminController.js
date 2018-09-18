const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Admin = require('./../models/adminUser')
const fs = require('fs')
const jwt = require('jsonwebtoken')
const config = require('../config')
const Articles = require('../models/article')
const Goods =require('../models/goods')
const verify = require('../middleware/verify')

router.post('/login', async(req,res) => {
    let id = req.body.id;
    let passwordOri = req.body.password;
    let password = require('crypto').createHash('md5').update(passwordOri).digest('hex');
    let admin = await Admin.findOne({id}).exec();
    if(admin != null) {
        if(password === admin.password) {
            const token = jwt.sign({
                adminId: admin._id,
                name: admin.name,
                exp: Math.floor(Date.now() / 1000) + (60 * 60) //设置一小时的过期时间
            }, config.jwt.secret);
            res.json({
                success: true,
                adminId: admin._id,
                name: admin.name,
                token: token,
                adminIco: admin.adminIco
            })
        }else {
            res.status(401).send('登录密码错误');
        }
    }else {
        res.status(401).send('登录账号错误');
    }
})



//单条/批量删除食物
// router.post('/delGoods', verify, async(req, red, next) => {
//     let delList = req.body.delList;
//     Goods.remove({_id: {$in: delList}}, (err) => {
//         if(err) {
//             console.log(err)
//         }
//     })
// })
//删除文章
router.post('/delArticles', verify, async (req, res, next) => {
    let delList = req.body.delList;
    Articles.remove({ _id: { $in: delList } }, (err) => {
        if (err) {
            console.log(err)
        } else {
            res.json({
                status: 'suc'
            })
        }
    })
});

//获取文章审核列表
router.get('/getCheckList', verify, async (req,res,next) => {
    let doc = await Articles.find({ status: 'untreated' }).populate('publisher', 'userName');
    if(doc) {
        res.json({
            result: doc
        })
    }
})

//通过/退回文章
router.post('/updateStatus', verify, (req, res, next) => {
    let id = req.body.id;
    let option = req.body.option;
    if(option == 'pass') {
        Articles.update({_id: id}, {status: 'pass'}, (err,result) => {
            if(err) {
                console.log(err)
            } else {
                res.json({
                    status: 'suc'
                })
            }
        })
    }else if(option == 'ban') {
        Articles.update({ _id: id }, { status: 'ban' }, (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.json({
                    status: 'suc'
                })
            }
        })
    }
})

//获取商品审核列表
router.get('/getGsCList', verify, async (req, res, next) => {
    let doc = await Goods.find({ status: 'untreated' }).populate('owner', 'userName');
    if (doc) {
        res.json({
            result: doc
        })
    }
})

//通过/退回商品发布申请
router.post('/updateGoodStatus', verify, (req, res, next) => {
    let id = req.body.id;
    let option = req.body.option;
    if (option == 'pass') {
        Goods.update({ _id: id }, { status: 'pass' }, (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.json({
                    status: 'suc'
                })
            }
        })
    } else if (option == 'ban') {
        Goods.update({ _id: id }, { status: 'ban' }, (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.json({
                    status: 'suc'
                })
            }
        })
    }
})

//update admin info 

router.post('/updateInfo', verify, (req, res, next) => {
    let id = req.body.id;
    let option = req.body.option;
    let name = req.body.name;
    let pwd = req.body.pwd;
    if (option === 'name') {
        Admin.update({'_id': id}, {$set: {'name': name}}, err => {
            if(err) {
                console.log(err)
            } else {
                res.json({
                    status: 'sucName'
                })
            }
        })
    }
    else if (option === 'pwd') {
        let newUserPwd = require('crypto').createHash('md5').update(pwd).digest('hex');
        Admin.update({ '_id': id }, { $set: { 'password': newUserPwd}}, err => {
            if (err) {
                console.log(err)
            } else {
                res.json({
                    status: 'sucPwd'
                })
            }
        })
    }
})

//admins list 
router.get('/adminLists', verify, async(req,res) => {
    let doc = await Admin.find();
    if (doc) {
        res.json({
            status: '0',
            result: doc
        })
    }
})

//add admin 
router.post('/addAdmin', verify, (req, res, next) => {
    let name = req.body.name;
    let id = req.body.id;
    let passwordOri = req.body.password;
    let password = require('crypto').createHash('md5').update(passwordOri).digest('hex');
    let info = {
        name: name,
        id: id,
        password: password
    }
    let admin = new Admin(info);
    admin.save((err) => {
        if (err) {
            console.log(err)
        } else {
            res.json({
                status: 'suc'
            })
        }
    })
})

//del admin
router.post('/deladmin', verify, (req,res) => {
    let id = req.body.id;
    Admin.remove({ '_id': id}, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.json({
                status: 'suc'
            })
        }
    })
})

//getGoodsList

router.get('/getGoodsList', verify, (req,res) => {
    let page = parseInt(req.query.page);
    let pageSize = parseInt(req.query.pageSize);
    let skip = (page - 1) * pageSize;
    let totalCount = 0;
    // Goods.count({ status: 'pass' }, (err, count) => {
    //     totalCount = count;
    // })
    let goodsModel = Goods.find({ status: 'pass' }).populate('owner', 'userName');
    goodsModel.skip(skip).limit(pageSize).sort({ 'publishDate': -1 }).exec((err, doc) => {
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
                    count: doc.length,
                    list: doc
                }
            });
        }
    })
})

//delGoods
router.post('/delGoods', verify, async (req, res, next) => {
    let delList = req.body.delList;
    await Goods.remove({ _id: { $in: delList } }, (err) => {
        if (err) {
            console.log(err)
        } else {;
            res.json({
                status: 'suc'
            })
        }
    })
});

// admin updateArticle
router.post('/updateArticle', verify, async (req,res, next) => {
    let articleId = req.body.articleId,
        articleTitle = req.body.articleTitle,
        abstract = req.body.abstract,
        articleImg = req.body.articleImg,
        content = req.body.content,
        updateDate = Date(),
        status = 'pass';
    await Articles.findOneAndUpdate({ _id: articleId }, { articleTitle, abstract, articleImg, content, updateDate, status }, (err, doc) => {
        if (err) {
            console.log(err)
        } else {
            res.json({
                status: '0',
                result: 'suc'
            })
        }
    })
})

// admin upgoods
router.post('/updateGoods/:gid', verify, (req, res, next) => {
    const gid = req.params.gid;
    const owner = req.cookies.userObjectId,
        productName = req.body.goodsName,
        salePrice = req.body.salePrice,
        productImage = req.body.productImage,
        sellerIntro = req.body.sellerIntro,
        updateDate = Date(),
        status = 'pass';
    previewImg = req.body.previewImg;
    if (previewImg.length == 0) {
        Goods.findOneAndUpdate({ productId: gid }, { owner, productName, salePrice, productImage, sellerIntro, updateDate, status }, (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.json({
                    status: '0',
                    result: 'suc'
                })
            }
        })
    } else {
        Goods.findOneAndUpdate({ productId: gid }, { owner, productName, salePrice, productImage, sellerIntro, updateDate, previewImg }, (err, result) => {
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

//admin publish article
router.post('/postArticle', verify, async (req, res) => {
    let articleTitle = req.body.articleTitle,
        abstract = req.body.abstract,
        articleImg = req.body.articleImg,
        publisher = "5b914f7608ec77313411c930",
        status =  'pass',
        content = req.body.content;
    let article = await new Articles({
        articleTitle,
        abstract,
        articleImg,
        content,
        publisher,
        status,
        publishDate: new Date()
    });
    article.save(err => {
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
})

module.exports = router;