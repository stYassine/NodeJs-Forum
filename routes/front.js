const express = require('express');
const router = express.Router();
const FrontController =require('../controllers/FrontController');
const AuthController =require('../controllers/AuthController');


router.all('/*', (request, response, next) => {

    response.app.locals.layout ='main';

    next();

});

/// Home Page
router.get('/', FrontController.homePage);

/// Register Page
router.get('/register', FrontController.registerPage);

/// Register
router.post('/register', AuthController.register);

/// Login Page
router.get('/login', FrontController.loginPage);

/// Login
router.post('/login', AuthController.login);

/// Single Post Page
router.get('/single/:id', FrontController.singlePost);

/// Search Posts Page
router.post('/search', FrontController.searchPage);

/// Profile Page
router.get('/profile/:id', FrontController.profilePage);

module.exports =router;