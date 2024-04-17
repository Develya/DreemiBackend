const express = require('express');
const UserController = require('../controllers/userController');

const router = express.Router();

router.post('/googleSignIn', UserController.googleSignIn);

module.exports = router;