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

router.get(
    '/isAuthenticated',
    UserController.isAuthenticated
)

router.get('/dummy', (req, res) => {
    return res.status(200).json({message : 'OK'});
})

module.exports = router;