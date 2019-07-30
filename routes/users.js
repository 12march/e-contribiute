const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');
const authController = require('../controllers/auth');
const groupController = require('../controllers/groups');


// Ensure Authencated Access Middleware
const ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash('error_msg', 'Not Authorized');
    res.redirect('/login');
}



/* GET home page. */
router.get('/', userController.home);

/* AUTH ROUTES. */
router.get('/login', authController.login);
router.get('/register', authController.register);
router.post('/register', authController.signup);
router.post('/login', authController.signin);
router.get('/logout', authController.logout);

/* GET profile */
router.get('/home', ensureAuthenticated, (req, res) => {
    res.render('home');
});

/* GROUP ROUTES */
router.get('/create-group', ensureAuthenticated, groupController.create);
router.get('/group', ensureAuthenticated, groupController.show);
router.post('/store-group', ensureAuthenticated, groupController.store);



module.exports = router;
