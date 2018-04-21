var app = angular.module('literate-viewclass', []);

app.config(function($interpolateProvider) {
	$interpolateProvider.startSymbol('{[');
	$interpolateProvider.endSymbol(']}');
});

app.controller('MainController', function ($scope) {
	$scope.categories = [];

	$scope.getClass = function() {
		var classname = window.location.href.split('/');
		classname = decodeURI(classname[classname.length - 1]);
		var i;
		for (i = 1; i <= parseInt(window.localStorage.getItem('classcount')) - 1; i++) {
			var _class = JSON.parse(window.localStorage.getItem('c' + i));
			if (_class.name === classname) {
				console.log(_class);
				$scope.class = _class;
				break;
			}
		}
		for (var j = 1; j <= parseInt(window.localStorage.getItem('c' + i + '-catcount')); j++) {
			$scope.categories.push(JSON.parse(window.localStorage.getItem('c' + i + '-cat' + j)));
		}
	}
});

$(document).ready(function () {

});