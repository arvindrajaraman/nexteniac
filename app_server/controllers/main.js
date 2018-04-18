/* GET home page */
module.exports.default = function(req, res, next) {
	res.redirect('/home');
};

module.exports.home = function(req, res, next) {
	res.render('home', {
		title: 'Home',
		styles: ['home'],
		scripts: ['home']
	});
};

module.exports.classes = function(req, res, next) {
	res.render('classes', {
		title: 'Classes',
		styles: ['classes'],
		scripts: ['classes']
	});
};

module.exports.viewclass = function(req, res, next) {
	res.render('viewclass', {
		title: req.params.classname,
		classname: req.params.classname,
		styles: ['viewclass'],
		scripts: ['viewclass']
	});;
};

module.exports.createclass = function(req, res, next) {
	res.render('createclass', {
		title: 'Create Class',
		styles: ['createclass'],
		scripts: ['createclass']
	});;
};