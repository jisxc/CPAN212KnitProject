//const express = require('express');
//const basicAuth = require('express-basic-auth');
//const router = express.Router();
//const knitController = require('../controllers/knit_controller');

//if (!process.env.RAVELRY_USERNAME || !process.env.RAVELRY_PASSWORD) {
  //console.error('Ravelry username and password not set in env!');
//}
//router.use(basicAuth({
  //users: {
    //[process.env.RAVELRY_USERNAME]: process.env.RAVELRY_PASSWORD // Use environment variables
  //},
  //challenge: true,
  //unauthorizedResponse: 'Unauthorized'
//}));

//router.get('/', knitController.getAllKnits);
//router.post('/', knitController.createKnit);

//module.exports = router;

const express = require('express');
const router = express.Router();
const knitController = require('../controllers/knit_controller');

router.get('/', knitController.getAllKnits);

module.exports = router;
