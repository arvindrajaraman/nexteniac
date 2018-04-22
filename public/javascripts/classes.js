var app = angular.module('literate-classes', []);

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
	$scope.unweightedgpa = 3.801;
	$scope.weightedgpa = 5.519;
	$scope.average = 'A';
	$scope.shownclasses = 0;

	$scope.search = {
		grade: window.localStorage.getItem('currentgrade'),
		mp: window.localStorage.getItem('currentmp'),
		sortby: '3'
	};
	$scope.classes = [];
	$scope.searchClasses = function() {
		for (var i = 1; i <= window.localStorage.getItem('classcount'); i++) {
			var _class = JSON.parse(window.localStorage.getItem('c' + i));
			_class.lsid = 'c' + i;
			$scope.classes.push(_class);
		}
	};
	$scope.redirect = function(link) {
		window.location.href = '/classes/' + $scope.classes[link].name;
	}

	$scope.refreshShownClassCount = function() {
		$scope.shownclasses = 0;
		for (var _class of $scope.classes) {
			if (_class.grade === $scope.search.grade && _class['mp' + $scope.search.mp]) $scope.shownclasses++;
		}
	};

	$scope.initClasses = function() {
		$scope.searchClasses();
		$scope.refreshShownClassCount();
	}
});

$(document).ready(function () {
	$('.dropdown').dropdown();
	
	if (window.localStorage.getItem('currentgrade')) $('#gradeSelectionDropdown').dropdown('set selected', window.localStorage.getItem('currentgrade'));
	else $('#gradeSelectionDropdown').dropdown('set selected', '9');
	if (window.localStorage.getItem('currentmp')) $('#mpSelectionDropdown').dropdown('set selected', window.localStorage.getItem('currentmp'));
	else $('#mpSelectionDropdown').dropdown('set selected', '1');
});