const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');
const authController = require('../controllers/auth');
const groupController = require('../controllers/groups');

/* GET home page. */
router.get('/', userController.home);

/* AUTH ROUTES. */
router.get('/login', authController.login);
router.get('/register', authController.register);

/* GROUP ROUTES */
router.get('/create-group', groupController.create);
router.get('/group', groupController.show);
router.post('/store-group', groupController.store);



module.exports = router;
