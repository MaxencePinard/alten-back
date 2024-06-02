const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.post('/getUser', userCtrl.getUser);
router.put('/editUser', userCtrl.editUser);
router.put('/adminColumns', userCtrl.editAdminColumnsList);

module.exports = router;
