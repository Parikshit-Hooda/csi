var mongoose = require('mongoose');
var schema = mongoose.Schema;

const CategorySchema = new schema({
    cat: {
        type: String,
        required: true
            //  unique: true
    }

});
var Cat = module.exports = mongoose.model('Cat', CategorySchema);