const mongoose = require('mongoose');

require('dotenv').config();


// Map global promise - get rid of warning
mongoose.Promise = global.Promise;
// Connect to mongoose
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true
})
.then(() => console.log('MongoDB Connected .....'));

module.exports = {mongoose};