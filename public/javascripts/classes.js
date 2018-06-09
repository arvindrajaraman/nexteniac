var app = angular.module('nexteniac-classes', []);

app.config(function($interpolateProvider) {
	$interpolateProvider.startSymbol('{[');
	$interpolateProvider.endSymbol(']}');
});

app.filter('check', function() {
	return function(val) {
		return (val) ? 'teal check' : 'red x';
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

app.filter('numequivtoletter', function() {
	return function(n) {
		n = parseFloat(n);
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
	$scope.tab = 1;
	$scope.average = 0;
	$scope.mps = 0;
	$scope.shownclasses = 0;

	$scope.search = {
		query: "",
		grade: parseInt(window.localStorage.getItem('currentgrade'))
	};
	$scope.currentmp = parseInt(window.localStorage.getItem('currentmp'));
	$scope.currentgrade = parseInt(window.localStorage.getItem('currentgrade'));
	$scope.classes = [];
	$scope.averages = [];
	$scope.classcounts = [0, 0, 0, 0];

	$scope.changeTab = function(t) {
		$scope.tab = t;
	}

	$scope.loadAverages = function() {
		for (var c = 1; c <= parseInt(window.localStorage.getItem("classcount")); c++) {
			$scope.averages.push(JSON.parse(window.localStorage.getItem("c" + c + "-averages")));
		}
	};

	$scope.searchClasses = function() {
		for (var i = 1; i <= window.localStorage.getItem('classcount'); i++) {
			var _class = JSON.parse(window.localStorage.getItem('c' + i));
			delete _class.priority;
			delete _class.difficulty;
			delete _class.goalaverage;
			delete _class.id;
			_class.lsid = 'c' + i;
			_class.letterAvg = $scope.averages[i-1];
			$scope.classcounts[_class.grade-9]++;
			$scope.classes.push(_class);
		}
	};

	$scope.redirect = function(link) {
		window.location.href = '/classes/' + $scope.classes[link].name;
	}

	$scope.calculateGPA = function() {
	  var weightedpts = 0, unweightedpts = 0, totalcredits = 0, _class, numequiv, letter, qualitypts, gpacomponent = {}, validmps = 0, credits = 0;
	  $scope.gpacomponents = [];
	  for (var c = 1; c <= parseInt(window.localStorage.getItem("classcount")); c++) {
	  	gpacomponent = {};
	  	validmps = 0;
	  	numequiv = 0;
	    _class = JSON.parse(window.localStorage.getItem("c" + c));
	    for (var avg of JSON.parse(window.localStorage.getItem("c" + c + "-averages"))) {
	    	if (avg) {
	    		validmps++;
	    		numequiv += avg;
	    		$scope.average += avg;
	    		$scope.mps++;
	    	}
	    }
	    numequiv /= validmps;
	    letter = GradeFactory.numEquivToLetter(numequiv);
	    gpacomponent.finalavg = letter;
	    switch (letter) {
	      case 'A+': qualitypts = 4.33; break;
	      case 'A': qualitypts = 4; break;
	      case 'A-': qualitypts = 3.67; break;
	      case 'B+': qualitypts = 3.33; break;
	      case 'B': qualitypts = 3; break;
	      case 'B-': qualitypts = 2.67; break;
	      case 'C+': qualitypts = 2.33; break;
	      case 'C': qualitypts = 2; break;
	      case 'C-': qualitypts = 1.67; break;
	      case 'D': qualitypts = 1; break;
	      case 'F': qualitypts = 0; break;
	    }
	    totalcredits += _class.credits;
	    unweightedpts += (qualitypts * _class.credits);
	    gpacomponent.course = _class.name;
	    gpacomponent.grade = _class.grade;
	    gpacomponent.type = _class.type;
	    gpacomponent.unweightedqualitypts = qualitypts;
	    gpacomponent.credits = _class.credits;
	    credits += gpacomponent.credits;
	    if (letter !== 'D' && letter !== 'F') {
	      if (_class.type === "0") qualitypts += 2;
	      else if (_class.type === "1") qualitypts += 1;
	    }
	    gpacomponent.weightedqualitypts = qualitypts;
	    weightedpts += (qualitypts * _class.credits);
	    $scope.gpacomponents.push(gpacomponent);
	  }
	  $scope.unweightedgpa = unweightedpts / totalcredits;
	  $scope.unweightedpts = unweightedpts;
	  $scope.weightedgpa = weightedpts / totalcredits;
	  $scope.weightedpts = weightedpts;
	  $scope.totalcredits = credits;
	  $scope.average /= $scope.mps;
	};

	$scope.calculateGPAProgression = function() {

	};

	$scope.initClasses = function() {
		$scope.loadAverages();
		$scope.searchClasses();
		$scope.calculateGPA();
		console.log($scope);
	};
});

$(document).ready(function () {
	$('.dropdown').dropdown();
	
	if (window.localStorage.getItem('currentgrade')) $('#gradeSelectionDropdown').dropdown('set selected', window.localStorage.getItem('currentgrade'));
	else $('#gradeSelectionDropdown').dropdown('set selected', '9');
});