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

	$scope.search = {
		grade: window.localStorage.getItem('currentgrade'),
		mp: window.localStorage.getItem('currentmp'),
		sortby: '3'
	};
	$scope.classes = [];
	$scope.searchClasses = function() {
		$scope.classes = [];
		for (var i = 1; i <= window.localStorage.getItem('classcount'); i++) {
			var _class = JSON.parse(window.localStorage.getItem('c' + i));
			if (_class.grade === $scope.search.grade.toString() && _class['mp' + $scope.search.mp]) $scope.classes.push(_class);
		}
		switch ($scope.search.sortby) {
			case '3':
				$scope.classes.sort(function (a,b) {
					if (a.name < b.name) return -1;
					else if (a.name > b.name) return 1;
					else return 0;
				});
				break;
		}
	};
	
	/*$(document).ready(function () {
		$(window).resize(function () {
			console.log('Resized');
			//alert('Resized');
			//$scope.screenwidth = $(window).width();
		});
	});*/
	
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

	$('#classesTable tbody tr').click(function () {
		window.location.href = $(this).attr('data-redirectto');
	});
});