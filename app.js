const express = require('express');
const exphds = require('express-handlebars');
const path = require('path');
const bodyParser =require('body-parser');
const mongoose = require('mongoose');

const app = express();

require('dotenv').config();

const port = process.env.PORT || 5000;


// Map global promise - get rid of warning
mongoose.Promise = global.Promise;
// Connect to mongoose
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true
})
.then(() => console.log('MongoDB Connected .....'));



//----------------------
//      LOAD MODELS
//----------------------
require('./models/Group');
const Group = mongoose.model('groups');

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


// STATIC FOLDER
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('welcome');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/create-group', (req, res) => {
    res.render('create-group');
});

app.get('/group', (req, res) => {
    res.render('group', {
        name: 'Josh group'
    });
});


app.listen(port, (req, res) => {
    console.log(`Server running at port: ${port}`);
});