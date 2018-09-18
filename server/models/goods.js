var mongoose = require('mongoose')
var Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

var productSchema =  new Schema({
  "productId": String,
  "productName": String,
  "salePrice": Number,
  "productImage": String,
  "productNum": Number,
  "owner": {type: Schema.Types.ObjectId, ref: 'User'},
  "checked": String,
  "previewImg": [],
  "publishDate": Date,
  "updateDate": {type: Date, default: Date.now()},
  "sellerIntro": String,
  "status": { type: String, default: 'untreated' }
});
//模型名称故意为 Good mongodb为自动最佳s进行集合查询，所以创建集合名称末尾最好加s，防止踩坑
module.exports = mongoose.model('Good',productSchema);
