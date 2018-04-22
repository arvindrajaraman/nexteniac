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

app.filter('lettergrade', function() {
	return function(grade) {
		grade = Math.round(grade * 100);
		if (grade >= 97) return 'A+';
		else if (grade >= 93 && grade <= 96) return 'A';
		else if (grade >= 90 && grade <= 92) return 'A-';
		else if (grade >= 87 && grade <= 89) return 'B+';
		else if (grade >= 83 && grade <= 86) return 'B';
		else if (grade >= 80 && grade <= 82) return 'B-';
		else if (grade >= 77 && grade <= 79) return 'C+';
		else if (grade >= 73 && grade <= 76) return 'C';
		else if (grade >= 70 && grade <= 72) return 'C-';
		else if (grade >= 65 && grade <= 69) return 'D';
		else return 'F';
	}
});

app.controller('MainController', function ($scope) {
	$scope.categories = [];
	$scope.grades = [];
	$scope.tab = 1;
	$scope.showngrades = 0;
	$scope.search = {
		mp: window.localStorage.getItem('currentmp')
	};
	$scope.changeTab = function(t) {
		$scope.tab = t;
	};
	
	$scope.getClass = function() {
		var classname = window.location.href.split('/');
		classname = decodeURI(classname[classname.length - 1]);
		var i;
		for (i = 1; i <= parseInt(window.localStorage.getItem('classcount')); i++) {
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
		$scope.lsid = i;
	};

	$scope.getAssignments = function() {
		for (var i = 1; i <= parseInt(window.localStorage.getItem('c' + $scope.lsid + '-assignmentcount')); i++) {
			var grade = JSON.parse(window.localStorage.getItem('c' + $scope.lsid + '-a' + i));
			grade.lsid = i;
			$scope.grades.push(grade);
		}
	};

	$scope.addGrade = function() {
		var ls = window.localStorage;
		var grade = {
			date: $scope.newgrade.date,
			mp: $scope.newgrade.mp,
			name: $scope.newgrade.name,
			ptsearned: $scope.newgrade.ptsearned,
			ptstotal: $scope.newgrade.ptstotal,
			category: $('#addGradeCategoryDropdown').val()
		};
		if (!ls.getItem('c' + $scope.lsid + '-assignmentcount')) ls.setItem('c' + $scope.lsid + '-assignmentcount', 1);
		else ls.setItem('c' + $scope.lsid + '-assignmentcount', parseInt(ls.getItem('c' + $scope.lsid + '-assignmentcount')) + 1);
		ls.setItem('c' + $scope.lsid + '-a' + ls.getItem('c' + $scope.lsid + '-assignmentcount'), JSON.stringify(grade));
		$scope.grades.push(grade);
		$scope.refreshShownGradeCount();
	};

	$scope.refreshShownGradeCount = function() {
		$scope.showngrades = 0;
		for (var grade of $scope.grades) {
			if (grade.mp === $scope.search.mp) $scope.showngrades++;
		}
	};

	$scope.initViewClass = function() {
		$scope.getClass();
		$scope.getAssignments();
		$scope.refreshShownGradeCount();
	};
});

$(document).ready(function () {
	$('.dropdown').dropdown();
	if (window.localStorage.getItem('currentmp')) $('#mpSelectionDropdown').dropdown('set selected', window.localStorage.getItem('currentmp'));
	else $('#mpSelectionDropdown').dropdown('set selected', '1');
	if (window.localStorage.getItem('currentmp')) $('#newgradeMPSelectionDropdown').dropdown('set selected', window.localStorage.getItem('currentmp'));
	else $('#newgradeMPSelectionDropdown').dropdown('set selected', '1');

	$('#addGradeButton').click(function () {
		$('#addGradeModal').modal('show');
	});
});