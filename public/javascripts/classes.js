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
		switch (val) {
			case 0:
			case '0':
				return 'Honors';
			case 1:
			case '1':
			case 2:
			case '2':
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

	$scope.search = {};
	$scope.classes = [];
	for (var i = 1; i <= window.localStorage.getItem('classcount'); i++) {
		$scope.classes.push(JSON.parse(window.localStorage.getItem('c' + i)));
	}

	//$scope.shownclasses = [{'red': 1}];
	/*$scope.searchClasses = function() {
		for (var _class of $scope.classes) {
			if (_class.grade === $scope.search.grade && _class['mp' + $scope.search.mp]) {
				$scope.shownclasses.push(_class);
			}
		}
	};

	$(document).ready(function () {
		$scope.searchClasses();
	});*/
});

$(document).ready(function () {
	$('.dropdown').dropdown();
	if (window.localStorage.getItem('currentgrade')) $('#gradeSelectionDropdown').dropdown('set selected', window.localStorage.getItem('currentgrade'));
	else $('#gradeSelectionDropdown').dropdown('set selected', '9');
	if (window.localStorage.getItem('currentmp')) $('#mpSelectionDropdown').dropdown('set selected', window.localStorage.getItem('currentmp'));
	else $('#mpSelectionDropdown').dropdown('set selected', '1');

	$('#classesTable tr').click(function () {
		window.location.href = $(this).attr('data-redirectto');
	});
});