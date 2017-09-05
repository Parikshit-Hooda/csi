var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var mongoose = require('mongoose');
var Category = require('../models/category');
var Blog = require('../models/blog');


router.get('/add', function(req, res) {
    res.render('addcategory', {
        "title": "Add Category"
    });
});


router.post('/add', function(req, res) {
    // console.log('1');
    //get form values
    var addcategory = req.body.addcategory;
    console.log(addcategory + '1');

    //form validation
    req.checkBody('addcategory', 'Add Category field is required').notEmpty();
    //check errors

    var errors = req.validationErrors();

    if (errors) {
        res.render('addcategory', {
            "errors": errors,
            "title": "Add Category"
        });
    } else {
        var newCategory = new Category({ addcategory: addcategory });
        newCategory.save(newCategory, function(err, category) {
            if (err) {
                console.log(err);
                res.send('error saving category');
            } else {
                console.log(category);
                req.flash('success_msg', 'category saved successfully');
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