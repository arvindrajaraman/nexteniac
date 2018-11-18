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

module.exports.termsofuse = function(req, res, next) {
	res.render('termsofuse', {
		title: 'Terms of Use'
	});;
	//res.redirect("https://app.termly.io/document/terms-of-use-for-website/3e6dc8cf-2db9-4c60-aac7-7723f0ac6462");
};

module.exports.privacypolicy = function(req, res, next) {
	/*res.render('privacypolicy', {
		title: 'Privacy Policy'
	});;*/
	res.redirect("https://app.termly.io/document/privacy-policy/54d467d1-f459-4b6a-b440-93b861de8eae");
};