var express = require('express');
var router = express.Router();
var ctrlMain = require('../controllers/main');

/* GET home page. */
router.get('/', ctrlMain.default);
router.get('/home', ctrlMain.home);
router.get('/classes', ctrlMain.classes);
router.get('/classes/:classname', ctrlMain.viewclass);
router.get('/createclass', ctrlMain.createclass);

module.exports = router;
