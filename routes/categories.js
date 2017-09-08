var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
//var mongoose = require('mongoose');
var app_cat = require('../app');
var Category = require('../models/category');
var Blog = require('../models/blog');


router.get('/add', function(req, res, next) {
    res.render('add_category', {
        "title": "Add Category"
    });
});


router.post('/add', function(req, res, next) {
    // console.log('1');
    //console.log(req.body);
    // console.log('1');
    // console.log(req.body.addcategory);
    //get form values
    var addcategory = req.body.addcategory;
    //  console.log(req.body.addcategory);
    console.log(addcategory);
    // console.log('4');

    //form validation
    req.checkBody('addcategory', 'Add Category field is required').notEmpty();

    // console.log('3');
    //check errors
    var errors = req.validationErrors();
    console.log(errors);

    if (errors) {
        res.render('add_category', {
            "errors": errors,
            "title": "Add Category"
        });
    } else {
        // console.log('2');
        var newCategory = new Category({ addCategory: addcategory });
        newCategory.save(newCategory, function(err, category) {
            if (err) {
                console.log(err);
                res.send('error saving category');
                // function setTimeOut({ res.redirect('/addcategory') }, 3000)
            } else {
                console.log(category);
                req.flash('success_msg', 'category saved successfully');
                res.redirect('/add_category');
            }
            // });
        });
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
//}
// });

router.get('/show/:category', function(req, res, next) {
    // var db = req.db;
    // var posts = db.get('posts');
    Blog.find({ category: req.params.category }, function(err, blogs) {
        res.render('index', {
            "title": req.param.category,
            "blogs": blogs
        });
    });
});


module.exports = router;