var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var mongoose = require('mongoose');
var Blog = require('../models/blog');

mongoose.Promise = global.Promise;

//get blog Homepage
//get blog route api
router.get('/', function(req,res){
  console.log('getting all blogs');
  Blog.find({}).exec(function(err, blogs){
    if(err) {
      res.send('error occured or no blog in database');
    } else {
      console.log(blogs);
      res.send(JSON.stringify(blogs));
    }
  });
});

//add post api
router.post('/add', function(req,res){
  //get form values
  var title = req.body.title;
  var category = req.body.category;
  var body = req.body.body;
  var author = req.body.author;
  var date = Date.now();

  req.checkBody('title', 'Title is required').notEmpty();
  req.checkBody('body','Body field is required').notEmpty();
  //req.checkBody('category','Category field is required').notEmpty();

  var errors = req.validationErrors();

  if(errors){
    res.render('addpost', {
      "errors":errors,
    });
  } else {
    var newBlog = new Blog({
      title:title,
      category:category,
      body:body,
      author:author,
      date:Date.now()
    });
      newBlog.save(function(err, blog){
        if(err){
        res.send('error saving blog');}
        else {
        console.log(blog);
        req.flash('success_msg','Your blog is saved.');
        res.redirect('/blog');
        }
});
}
});
//add post api ends


router.put('/:id', function(req, res){
  Blog.findOneAndUpdate({_id:req.params.id},{$set:{title:req.body.title, category:req.body.category, body:req.body.body, author:req.body.author}}, {upsert:true}, function(err, newBlog){
    if (err) {
      res.send('error updating');
    } else {
      if (newBlog){
        // blog.body = body;
        // blog.title = title;
        newBlog.save();
        res.send('Blog edited');
     }
    }
  });
});

//delete post route ok.
router.delete('/:id', function(req, res){
  //var title = req.query.title;
  Blog.findOneAndRemove({_id:req.params.id}, function(err, blog){
    if(err) {
      res.send('error removing');
    } else {
      console.log(blog);
      res.send('remove blog success.');
      res.status(204);
    }
  });
});

module.exports = router;
