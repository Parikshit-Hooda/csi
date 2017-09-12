var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
//var mongoose = require('mongoose');
var app_cat = require('../app');
var Cat = require('../models/category');
var Blog = require('../models/blog');


router.get('/', (req, res, next) => {
    Cat.find({}, function(err, cats) {
        if (err) throw err;
        else res.send(cats);
    });
    // .exec(category => {
    //     res.send(category);
    // })
    // .catch(err => {
    //     res.send(err);
    // })
});


router.get('/add', function(req, res, next) {
    // var categories = db.collection("categories");
    res.render('add_category', {
        "title": "Add Category"
    });
});

router.post('/add', function(req, res, next) {
    console.log(req.body);
    //get form values
    var cat = req.body.cat;
    //  console.log(req.body.addcategory);
    console.log(cat);
    // console.log('4');

    //form validation
    req.checkBody('cat', 'Add Category field is required').notEmpty();

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
        var newCategory = new Cat({ cat: cat });
        newCategory.save(newCategory, function(err, cat) {
            if (err) {
                console.log(err);
                res.send('error saving category');
            } else {
                console.log('category saved');
                console.log(cat);
                req.flash('success_msg', 'category saved successfully');
                res.redirect('/');
            }
        });
    }
});

router.get('/:id', (req, res, next) => {
    Cat.find({ _id: req.params.id }, (err, cat) => {
        res.send(cat);
    });
});

router.get('/show/:category', function(req, res, next) {
    // var db = req.db;
    // var posts = db.get('posts');
    Blog.find({ cat: req.params.cat }, function(err, blogs) {
        res.render('index', {
            "title": req.param.cat,
            "blogs": blogs
        });
    });
});

module.exports = router;