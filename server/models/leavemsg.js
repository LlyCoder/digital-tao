const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

let LeaveMsgSchema = new Schema({
    goods: {type: ObjectId, ref: 'Good'},
    from : {type: ObjectId, ref: 'User'},
    to: {type: ObjectId, ref: 'User'},
    sendDate: { type: Date, default: Date.now() },
    content: String,
    reply: [{
        from: { type: ObjectId, ref: 'User' },
        to: { type: ObjectId, ref: 'User' },
        content: String,
        createAt: {type: Date, default: Date.now()}
    }]
});

module.exports = mongoose.model("LeaveMsg",LeaveMsgSchema);