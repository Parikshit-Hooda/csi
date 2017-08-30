var express= require('express');
var router = express.Router();

//Get Homepage
router.get('/', function(req,res){
  res.render('index',{
    'title':'Home'
  });
});

router.get('/about_us', function(req,res){
  res.render('about_us', {
    'title':'About Us'
  });
});

router.get('/contact_us', function(req,res){
  res.render('contact_us', {
    'title':'Contact Us'
  });
});

router.get('/activities', function(req,res){
  res.render('activities', {
    'title':'Activitites'
  });
});

router.get('/new-mem-reg', function(req,res){
  res.render('new-mem-reg', {
    'title':'Registration'
  });
});

router.get('/blog', function(req,res){
  res.render('blog', {
    'title':'Blog'
  });
});

// function ensureAuthenticated(req,res,next){
//   if(req.isAuthenticated()){
//     return next();
//   } else {
//     //req.flash('error_msg', ' you are not logged in');
//     res.redirect('/users/login');
//   }
// }

module.exports = router;
