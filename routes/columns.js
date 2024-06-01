const express = require('express');
const router = express.Router();
const columnsCtrl = require('../controllers/columns');
const auth = require('../middleware/auth');

router.post('/newColumnsList', columnsCtrl.createColumnsList);
router.post('/newAdminColumnsList', columnsCtrl.createAdminColumnsList);
router.get('/:lang', columnsCtrl.getColumns);
router.get('/adminColumns/:lang', auth, columnsCtrl.getAdminColumns);
router.put('/adminColumns/:id', columnsCtrl.editAdminColumns);

module.exports = router;
