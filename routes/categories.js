var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var mongoose = require('mongoose');
var Category=require('../models/category');

mongoose.Promise = global.Promise;

router.get('/add', function(req, res, next) {
  res.render('addcategory', {
    "title":"Add Category"
  });
});


router.post('/add', function(req,res,next){
  //get form values
  var addcategory= req.body.addcategory;

  //form validation
  req.checkBody('addcategory','Add Category field is required').notEmpty();
  //check errors

  var errors = req.validationErrors();

  if(errors){
    res.render('addcategory', {
      "errors":errors,
      "title":Add Category
    });
  } else {
    var newCategory = new Category({
      addcategory:addcategory
    });
  //  var categories = db.get('categories');
newCategory.save(function(err, category){
  if(err)
    {
    res.send('error saving category');
    } else {
    console.log(category);
    req.flash('success_msg','category saved successfully');
    res.redirect('/addcategory');
  }
});
// });
    //submit to db
  //   categories.insert({
  //     "title":title
  // }, function(err, category){
  //   if(err){
  //     res.send('there was an issue submitting the category');
  //   } else {
  //     req.flash('success', 'category submitted');
  //     res.location('/');
  //     res.redirect('/');
  //   }
  //  });
 }
});

router.get('/show/:category', function(req, res, next){
	var db = req.db;
	var posts = db.get('posts');
	posts.find({category: req.params.category}, {}, function(err, posts){
		res.render('index', {
			"title": req.param.category,
			"posts": posts
		});
	});
});


module.exports = router;
