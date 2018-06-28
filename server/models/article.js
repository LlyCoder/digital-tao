const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const articleSchema = new Schema({
    articleTitle: String,
    publisher: {type: ObjectId, ref: 'User'},
    publishDate: {type: Date, default: Date.now()},
    articleImg: String,
    abstract: String,
    content: String,
    like: {type: Number, default: 0},
    status: { type: String, default: 'untreated'}
});

module.exports = mongoose.model('Article', articleSchema);