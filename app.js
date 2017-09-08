var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongo = require('mongodb');
var mongoose = require('mongoose');
var logger = require('morgan');
//var methodOverride = require('method-override');
mongoose.connect('mongodb://localhost/csi', { useMongoClient: true });
var db = mongoose.connection;
mongoose.Promise = global.Promise;

//routes
var routes = require('./routes/index');
var users = require('./routes/users');
var blogs = require('./routes/blogs');
var categories = require('./routes/categories');

//init app
var app = express();

//app.use(express.methodOverride());

//date formatter
app.locals.moment = require('moment');

app.locals.truncateText = function(text, length) {
    var truncateText = text.substring(0, length);
    return truncateText;
}

app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({ defaultLayout: 'layout' }));
app.set('view engine', 'handlebars');

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//set static folder
app.use(express.static(path.join(__dirname, 'public')));

//express session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

//passport init
app.use(passport.initialize());
app.use(passport.session());

//express validator
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.'),
            root = namespace.shift(),
            formParam = root;

        while (namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param: formParam,
            msg: msg,
            value: value
        };
    }
}));

//connect flash
app.use(flash());


//global vars
app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});

//making db accessible to all routers
app.use(function(req, res, next) {
    req.db = db;
    next();
});

app.post('/contact', function(req, res) {
    var api_key = 'key-bad93b6b64b2c4edeef5ea0d3180bc38';
    var domain = 'sandbox9201cb1b2e91468294c35daa51aa9700.mailgun.org';
    var mailgun = require('mailgun-js')({ apiKey: api_key, domain: domain });

    var data = {
        from: 'Admin CSI-DTU <postmaster@sandbox9201cb1b2e91468294c35daa51aa9700.mailgun.org>',
        to: 'csidtuofficial@gmail.com',
        subject: req.body.emailctact,
        text: req.body.textareactact
    };

    mailgun.messages().send(data, function(error, body) {
        console.log(body);
        if (!error) {
            req.flash('submitted successfully, thank you for contacting us');
            res.redirect('/');
        } else {
            req.flash('error submitting form');
            res.redirect('/');
        }
    });
});

app.post('/new-mem-reg', function(req, res) {
    var api_key = 'key-bad93b6b64b2c4edeef5ea0d3180bc38';
    var domain = 'sandbox9201cb1b2e91468294c35daa51aa9700.mailgun.org';
    var mailgun = require('mailgun-js')({ apiKey: api_key, domain: domain });

    var data = {
        from: 'Admin CSI-DTU <postmaster@sandbox9201cb1b2e91468294c35daa51aa9700.mailgun.org>',
        to: 'csidtuofficial@gmail.com',
        subject: 'New' + req.body.fullnamenmr,
        text: req.body.fullnamenmr + req.body.phonenumbernmr + req.body.emailnmr + req.body.branchnmr
    };

    mailgun.messages().send(data, function(error, body) {
        console.log(body);
        if (!error) {
            req.flash('submitted successfully, thank you for contacting us');
            res.redirect('/');
        } else {
            req.flash('error submitting form');
            res.redirect('/');
        }
    });
});


app.use('/', routes);
app.use('/users', users);
app.use('/blogs', blogs);
app.use('/categories', categories);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//     var err = new Error('Not Found');
//     err.status = 404;
//     next(err);
// });

// // error handler
// app.use(function(err, req, res, next) {
//     // set locals, only providing error in development
//     res.locals.message = err.message;
//     res.locals.error = req.app.get('env') === 'development' ? err : {};
//     // render the error page
//     res.status(err.status || 500);
//     res.render('error');
//});

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), function() {
    console.log('server running on ' + app.get('port'));
});

module.exports = app;