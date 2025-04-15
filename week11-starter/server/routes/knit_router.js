const express = require('express');
const router = express.Router();
const knitController = require('../controllers/knit_controller');

router.get('/', knitController.getAllKnits);

module.exports = router;
