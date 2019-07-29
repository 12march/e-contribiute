const express = require('express');
const exphds = require('express-handlebars');
const path = require('path');
const bodyParser =require('body-parser');

const {mongoose} = require('./db/mongoose');

const app = express();

const port = process.env.PORT || 5000;


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