const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const dbURL = 'mongodb://localhost:27017';

router.get('/getList', (req,res) => {
  MongoClient.connect(dbURL, (err,db)=> {
    const mall = db.db('mall');
    const goods = mall.collection('goods');
    // goods.createIndex({productName: "text"},{default_language: "english"}, (err,doc)=> {
    //   if(err) {
    //     console.log(err)
    //   }
    // })
    var mi = "净水器";
    goods.find({"productName":{$regex:new RegExp('['+mi+']'+'{1,}')}}).toArray(function(err,docs) {
      if(err) {
        console.log(err.message)
      }
      res.json({
        msg: '',
        result: docs
      })
    })
  })
})
module.exports = router;
