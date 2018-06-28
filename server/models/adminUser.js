const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const adminUserSchema = new Schema({
    name: String,
    id: String,
    password: String
})

module.exports = mongoose.model('Admin', adminUserSchema);