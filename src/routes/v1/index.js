const express = require('express');

const UserController = require('../../controllers/user-controller');
const {AuthRequestvalidators} = require('../../middlewares/index')
const router = express.Router();

router.post(
    '/signup', 
    AuthRequestvalidators.validateUserAuth,
    UserController.create);
    
router.post('/signin', 
    AuthRequestvalidators.validateUserAuth,
    UserController.signIn);

module.exports = router;