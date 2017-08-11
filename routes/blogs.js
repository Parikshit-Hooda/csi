var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/csi');
var db = mongoose.connection;


var Post = require('../models/blog');

// var post = require('../models/blog');
// //get blog Homepage
// router.get('/', function(req,res){
//   var post = db.collection('posts');
//   post.find({}, function(err, post){
//
//     if(post){
//       res.send(JSON.stringify(post));
//     } else{
//       res.send('no post in database');
//     }
//   });
// });  // var db = req.db;
//   // var posts;
//
// //   //var posts = db.get('posts');
// //   posts.find({},{}, function(err, posts){
// //     res.render('blog', {
// //       "posts":posts
// //     });
// //   });
// // });
// //
// // ?
//
// router.post('/add', function(req,res){
//   //get form values
//   var title= req.body.title;
//   var category = req.body.category;
//   var body = req.body.body;
//   var author = req.body.author;
//   var date = new Date();
//   date = Date.now;
//
//   req.checkBody('title', 'Title is required').notEmpty();
//   req.checkBody('body','Body field is required').notEmpty();
//   req.checkBody('category','Category field is required').notEmpty();
//
//   var errors = req.validationErrors();
//
//   if(errors){
//     res.render('addpost', {
//       "errors":errors,
//     });
//   } else {
//     var newBlog = new Blog({
//       title:title,
//       category:category,
//       body:body,
//       author:author,
//       date:Date.now
//     });
//       newBlog.save(function(err){
//         if(err) throw err;
//         console.log(blog);
//       });
//       req.flash('success_msg','Your blog is saved.');
//       res.redirect('/blog');
//           }
// });

router.post('/', function(req, res){
  var db = req.db;
  var post = db.collection('posts');

  var title = req.body.title;
  var body = req.body.content;
  var date = Date.now;
  var author = req.body.author;
  var newPost =new post({
    title: title,
    body: body,
    author:author,
    date : date
  });
  newPost.save();
  res.send('Post created');
});

router.get('/', function(req, res){
  var post = db.collection('posts');

  post.find({}, function(err, post){
    if(post){
      res.send(post);
    }else{
      res.send('No posts in database');
    }
  })
});

router.put('/', function(req, res){
  var post = db.collection('posts');

  var content = req.body.content;
  var title = req.query.title;
  post.findOne({title: title}, function(err, post){
    if (post){
      post.content = content;
      post.save();
      res.send('Post edited');
    }else{
      res.send('Post doesnt exist');
    }

  })
})


router.delete('/', function(req, res){
  var post = db.collection('posts');

  var title = req.query.title;
  post.findOne({title: title}, function(err, post){
    if(post){
      post.remove()
      res.send('Post removed')
    }else{
      res.send('Post does not exist')
    }
  })

});





module.exports = router;
