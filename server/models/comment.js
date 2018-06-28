const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const commentSchema = new Schema({
    article: { type: ObjectId, ref: 'Article'},
    from: {type: ObjectId, ref: 'User'},
    reply: [{
        from: {type: ObjectId, ref: 'User'},
        to: {type: ObjectId, ref: 'User' },
        content: String,
        createAt: {type: Date, default: Date.now()}
    }],
    content: String,
    createAt: {type: Date, default: Date.now()}
})

module.exports = mongoose.model('Comment', commentSchema);