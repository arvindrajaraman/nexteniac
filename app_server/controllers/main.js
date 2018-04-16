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