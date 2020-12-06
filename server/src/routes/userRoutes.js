const express = require('express');

const authorization = require('../middlewares/authorization');
const adminAuthorization = require('../middlewares/adminAuthorization');
const {
  fetchCurrentUser,
  updateUser,
  deleteUser,
  fetchAllUsers,
  fetchUserById,
} = require('../controllers/userController');

const router = express.Router();

router.get('/', authorization, fetchCurrentUser);

router.patch('/', authorization, updateUser);

router.delete('/', authorization, deleteUser);

router.get('/all-users', authorization, adminAuthorization, fetchAllUsers);

router.get('/:id', fetchUserById);

module.exports = router;
