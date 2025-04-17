const express = require('express');
const router = express.Router();
const knitController = require('../controllers/knit_controller');

router.get('/', knitController.getAllKnits);
//code works without this, this shouldnt break it - 1 line
router.get("/:id", knitController.getKnitById);

module.exports = router;
