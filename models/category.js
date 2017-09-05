const mongoose = require('mongoose');
const schema = mongoose.Schema;

const CategorySchema = new schema({
    addcategory: {
        type: String,
        required: true
            //  unique: true
    }

});
const Category = module.exports = mongoose.model('Category', CategorySchema);