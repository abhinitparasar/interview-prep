const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware').protect;
const {registerUser, loginUser, getMe} = require('../controllers/userControlller');

router.post('/register' , registerUser);
router.post('/login' , loginUser);
router.get('/get', protect, getMe) //By placing protect before getMe in the route definition, we ensure that the protect middleware will always run first. If the token is invalid, it will send an error and the getMe function will never even be called.

module.exports = router ;