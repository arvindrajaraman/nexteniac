var app = angular.module('literate-viewclass', []);

app.config(function($interpolateProvider) {
	$interpolateProvider.startSymbol('{[');
	$interpolateProvider.endSymbol(']}');
});

app.filter('check', function() {
	return function(val) {
		return (val) ? 'green check' : 'red x';
	}
});

app.filter('type', function() {
	return function(val) {
		switch (parseInt(val)) {
			case 0:
				return 'Honors';
			case 1:
			case 2:
				return 'Level ' + val;
			default:
				return val;
		}
	}
});

app.controller('MainController', function ($scope) {
	$scope.categories = [];
	$scope.tab = 1;
	$scope.changeTab = function(t) {
		$scope.tab = t;
	};

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
	$('.dropdown').dropdown();
	if (window.localStorage.getItem('currentmp')) $('#mpSelectionDropdown').dropdown('set selected', window.localStorage.getItem('currentmp'));
	else $('#mpSelectionDropdown').dropdown('set selected', '1');
});