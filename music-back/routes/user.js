const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  getCurrentUser,
  updatePassword,
} = require('../controllers/user');
const {
  authoriseUser,
  authoriseRoles,
} = require('../middleware/Authorization');

router.route('/').get(authoriseUser, authoriseRoles('admin'), getAllUsers);
router
  .route('/me')
  .get(authoriseUser, getCurrentUser)
  .patch(authoriseUser, updatePassword);

module.exports = router;
