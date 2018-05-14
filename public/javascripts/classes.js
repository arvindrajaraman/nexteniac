var app = angular.module('nexteniac-classes', []);

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

class GradeFactory {
	static percentToLetter(p) {
		p = Math.round(p);
		if (p === null) return null;
		else if (p >= 97) return "A+";
		else if (p >= 93 && p <= 96) return "A";
		else if (p >= 90 && p <= 92) return "A-";
		else if (p >= 87 && p <= 89) return "B+";
		else if (p >= 83 && p <= 86) return "B";
		else if (p >= 80 && p <= 82) return "B-";
		else if (p >= 77 && p <= 79) return "C+";
		else if (p >= 73 && p <= 76) return "C";
		else if (p >= 70 && p <= 72) return "C-";
		else if (p >= 65 && p <= 69) return "D";
		else return "F";
	}
	
	static letterToNumEquiv(l) {
		if (l === "A+") return 10;
		else if (l === "A") return 9;
		else if (l === "A-") return 8;
		else if (l === "B+") return 7;
		else if (l === "B") return 6;
		else if (l === "B-") return 5;
		else if (l === "C+") return 4;
		else if (l === "C") return 3;
		else if (l === "C-") return 2;
		else if (l === "D") return 1;
		else return 0;
	}
	
	static numEquivToLetter(n) {
		if (n < 1) return 'F';
		else n = Math.round(n);
		
		if (n === 10) return 'A+';
		else if (n === 9) return 'A';
		else if (n === 8) return 'A-';
		else if (n === 7) return 'B+';
		else if (n === 6) return 'B';
		else if (n === 5) return 'B-';
		else if (n === 4) return 'C+';
		else if (n === 3) return 'C';
		else if (n === 2) return 'C-';
		else return 'D';
	}
}

app.controller('MainController', function ($scope) {
	$scope.unweightedgpa = 3.801;
	$scope.weightedgpa = 5.519;
	$scope.average = 'A';
	$scope.shownclasses = 0;

	$scope.search = {
		grade: parseInt(window.localStorage.getItem('currentgrade')),
		mp: parseInt(window.localStorage.getItem('currentmp'))
	};
	$scope.classes = [];
	$scope.searchClasses = function() {
		for (var i = 1; i <= window.localStorage.getItem('classcount'); i++) {
			var _class = JSON.parse(window.localStorage.getItem('c' + i));
			_class.lsid = 'c' + i;
			_class.percentAvg = [];
			_class.letterAvg = [];
			// Calculate average
			var categories = [{}, {}, {}, {}];
			var totalpts = [0, 0, 0, 0];
			var totalweight = [0, 0, 0, 0];
			for (var mp = 1; mp <= 4; mp++) {
				for (var cat = 1; cat <= parseInt(window.localStorage.getItem(_class.lsid + "-catcount")); cat++) {
					var category = JSON.parse(window.localStorage.getItem(_class.lsid + "-cat" + cat));
					categories[mp-1][category.name] = {
						weight: category.weight,
						ptsearned: 0,
						ptstotal: 0
					};
				}
			}
			for (var g = 1; g <= parseInt(window.localStorage.getItem(_class.lsid + "-assignmentcount")); g++) {
				var grade = JSON.parse(window.localStorage.getItem(_class.lsid + "-a" + g));
				console.log(categories);
				categories[parseInt(grade.mp-1)][grade.category].ptsearned += grade.ptsearned;
				categories[parseInt(grade.mp-1)][grade.category].ptstotal += grade.ptstotal;
			}
			for (var mp = 1; mp <= 4; mp++) {
				for (var category in categories[mp-1]) {
					if (!categories[mp-1].hasOwnProperty(category)) continue;
					if (categories[mp-1][category].ptstotal === 0) continue;
					totalpts[mp-1] += ((categories[mp-1][category].ptsearned / categories[mp-1][category].ptstotal) * categories[mp-1][category].weight);
					totalweight[mp-1] += categories[mp-1][category].weight;
				}
				if (totalweight[mp-1] === 0) {
					_class.percentAvg.push(null);
					_class.letterAvg.push(null);
				}
				else {
					_class.percentAvg.push((totalpts[mp-1] / totalweight[mp-1]) * 100);
					_class.letterAvg.push(GradeFactory.percentToLetter((totalpts[mp-1] / totalweight[mp-1]) * 100));
				}
			}
			// Insert class into $scope
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