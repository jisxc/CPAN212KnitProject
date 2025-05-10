const express = require('express');
const userController = require('../controllers/user_controller');
const router = express.Router();

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/logout', userController.logoutUser);
router.get('/profile', userController.getUserProfile);
router.post('/add-order', userController.addOrderToUser);

module.exports = router;
