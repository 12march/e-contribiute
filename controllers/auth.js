const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passport = require('passport')

//  LOAD USER MODEL
require('../models/User');
const User = mongoose.model('users');

/* GET login page. */
const login = (req, res) => {
    res.render('login');
};


/* GET register page. */
const register = (req, res) => {
    res.render('register');
};


/* POST Validate and store new user */
const signup = (req, res) => {
    let errors = [];

    if (req.body.password != req.body.confirmPassword) {
        errors.push({text:'Password do not match'});
    }

    if (req.body.password.length < 6) {
        errors.push({text:'Password should be up to 6 characters'});
    }

    if (errors.length > 0) {
        res.render('register', {
            errors: errors,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phone: req.body.phone,
            email: req.body.email
        });
    } else {
        // CHECK IF EMAIL ALREADY EXISTS
        User.findOne({email: req.body.email})
        .then(user => {
            if (user){
                req.flash('error_msg', 'Email has already been used');
                res.render('register', {
                    errors: errors,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    phone: req.body.phone,
                    email: req.body.email
                });
            } else {
                // COLLECT DETAILS FOR NEW USER
                const newUser = new User({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    phone: req.body.phone,
                    email: req.body.email,
                    password: req.body.password
                });

                // ENCRYPT PASSWORD
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser.save().then(user => {
                            req.flash('success_msg', 'You are now registered and can now log in');
                            res.redirect('/login');
                        }).catch(err => {
                            console.log(err);
                            return;
                        });
                    });
                });
            }
        });

    }
}


/* POST Validate and store new user */
const signin = (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/home',
        failureRedirect: '/login',
        failureFlash: true,
    })(req, res, next);
}


/* GET logout user */
const logout = (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/login')
}


module.exports = {login, register, signup, signin, logout};