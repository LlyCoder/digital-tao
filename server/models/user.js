var mongoose = require('mongoose')
var Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

var userSchema = new Schema({
  "userId": String,
  "userName": String,
  "userPwd": String,
  "userIco": { type: String, default: 'defaultUser.png'},
  "orderList": Array,
  "cartList": [
    {
      "productId": String,
      "productName": String,
      "salePrice": String,
      "productImage": String,
      "checked": String,
      "productNum": String
    }
  ],
  "addressList": [
    {
      "addressId": String,
      "userName": String,
      "streetName": String,
      "postCode": Number,
      "tel": Number,
      "isDefault": Boolean
    }
  ],
  "saleList": [
    {
      type: ObjectId, ref: 'Good'
    }
  ],
  "likeList": [
    {
      type: ObjectId, ref: 'Article'
    }
  ],
  "articleList": [
    {
      "arTitle": String,
      "publisher": String,
      "arContent": String,
      "publishDate": Date
    }
  ],
  "leaveMsg": [
    {
      type: ObjectId, ref: 'LeaveMsg'
    }
  ]
});
module.exports = mongoose.model("User",userSchema);
