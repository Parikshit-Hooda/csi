var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BlogSchema = new Schema({
  title:{
      type:String,
      required:true
  },
  body:{
      type:String,
      required:true
  },
  author:{
    type:String,
    required:true
    // default:"username"
  },
date:{
  type:Date,
default:Date.now
},

category:{
  type:String,
  required:true
}

});


var Post = module.exports = mongoose.model('Post', BlogSchema);
