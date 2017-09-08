var mongoose = require('mongoose');
var schema = mongoose.Schema;

const CategorySchema = new schema({
    addCategory: {
        type: String,
        required: true
            //  unique: true
    }

});
var Category = module.exports = mongoose.model('Category', CategorySchema);