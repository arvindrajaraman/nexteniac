var express = require('express');
var router = express.Router();
var ctrlMain = require('../controllers/main');

/* GET home page. */
router.get('/', ctrlMain.default);
router.get('/home', ctrlMain.home);
router.get('/classes', ctrlMain.classes);

module.exports = router;
