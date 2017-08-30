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
    required:true,
    default:"anonymous"
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


var Blog = module.exports = mongoose.model('Blog', BlogSchema);
