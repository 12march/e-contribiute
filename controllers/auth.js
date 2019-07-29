
/* GET login page. */
const login = (req, res) => {
    res.render('login');
};


/* GET register page. */
const register = (req, res) => {
    res.render('register');
};


module.exports = {login, register};