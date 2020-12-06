const refreshTokenAuthorization = require('../middlewares/refreshTokenAuthorization');
const authorization = require('../middlewares/authorization');

const express = require('express');
const {
  registerUser,
  loginUser,
  refreshToken,
  isAuthenticated,
} = require('../controllers/authController');

const router = express.Router();

router.post('/register', registerUser);

router.post('/login', loginUser);

router.get('/refresh-token', refreshTokenAuthorization, refreshToken);

router.get('/is-authenticated', authorization, isAuthenticated);

module.exports = router;
