const express = require('express');
const exphds = require('express-handlebars');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');

const {mongoose} = require('./db/mongoose');

const app = express();

const port = process.env.PORT || 5000;

// PASSPORT CONFIG
require('./config/passport')(passport);


//----------------------
//      LOAD MODELS
//----------------------
// require('./models/Group');
// const Group = mongoose.model('groups');

// require('./models/User');
// const User = mongoose.model('users');


//----------------------------
//       MIDDLEWARES
//----------------------------
// HANDLEBARS MIDDLEWARE
app.engine('.hbs', exphds({
    defaultLayout: 'main',
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

// BODY PARSER MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// EXPRESS SESSION MIDDLEWARE
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

// PASSPORT MIDDLEWARE
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());


// GLOBAL VARIABLES
app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;     //session
    next();
})



// STATIC FOLDER
app.use(express.static(path.join(__dirname, 'public')));



//--------------------------
//      Routes
//--------------------------
// Load Routes
let users = require('./routes/users');

// Use Routes
app.use('/', users);


app.listen(port, (req, res) => {
    console.log(`Server running at port: ${port}`);
});

module.exports = {app};