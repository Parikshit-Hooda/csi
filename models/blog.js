var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BlogSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    body: {
        type: String,
        required: true,
        unique: true
    },
    author: {
        type: String,
        required: true,
        default: "anonymous"
    },
    date: {
        type: Date,
        default: Date.now()
    },
    cat: {
        type: String,
        required: true
    }
});


var Blog = module.exports = mongoose.model('Blog', BlogSchema);