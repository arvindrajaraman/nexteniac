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
		if (n === 0) return 'F';
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

	static letterToUnweightedPoints(l) {
		switch (l) {
			case 'A+': return 4.33; break;
			case 'A': return 4; break;
			case 'A-': return 3.67; break;
			case 'B+': return 3.33; break;
			case 'B': return 3; break;
			case 'B-': return 2.67; break;
			case 'C+': return 2.33; break;
			case 'C': return 2; break;
			case 'C-': return 1.67; break;
			case 'D': return 1; break;
			case 'F': return 0; break;
		}
	}

	static letterToWeightedPoints(l, t) {
		switch (l) {
			case 'D': return 1; break;
			case 'F': return 0; break;
		}
		var pts;
		switch (l) {
			case 'A+': pts = 4.33; break;
			case 'A': pts = 4; break;
			case 'A-': pts = 3.67; break;
			case 'B+': pts = 3.33; break;
			case 'B': pts = 3; break;
			case 'B-': pts = 2.67; break;
			case 'C+': pts = 2.33; break;
			case 'C': pts = 2; break;
			case 'C-': pts = 1.67; break;
		}
		switch (parseInt(t)) {
			case 2: return pts; break;
			case 1: return pts + 1; break;
			case 0: return pts + 2; break;
		}
	}
}

app.controller('MainController', function ($scope, $interval) {
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
	$scope.Math = window.Math;

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
		if (parseInt(window.localStorage.getItem('classcount')) === 0 || !window.localStorage.getItem('classcount')) $scope.noclasses = true;
		else $scope.noclasses = false;
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
	    if (window.localStorage.getItem("gpasettings-" + _class.grade) == "false") continue;
	    if (parseInt(window.localStorage.getItem("c" + c + "-assignmentcount")) === 0) continue;
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
	  $scope.unweightedgpa = Math.round(unweightedpts * 100 / totalcredits) / 100;
	  $scope.unweightedpts = unweightedpts;
	  $scope.weightedgpa = Math.round(weightedpts * 100 / totalcredits) / 100;
	  $scope.weightedpts = weightedpts;
	  $scope.totalcredits = credits;
	  $scope.average /= $scope.mps;
	  $scope.average = GradeFactory.numEquivToLetter($scope.average);
	  if (!$scope.unweightedgpa) {
	  	$scope.unweightedgpa = "-";
	  	$scope.weightedgpa = "-";
	  	$scope.average = "-";
	  }
	};

	$scope.calculateGPAProgression = function() {
		$scope.unweightedgpapoints = [];
		$scope.weightedgpapoints = [];
		$scope.gpalabels = [];
		var points = 0;
		for (var mp = 1; mp <= 16; mp++) {
			var unweightedpts = 0, weightedpts = 0, credits = 0;
			for (var c = 1; c <= $scope.classes.length; c++) {
				var _class = $scope.classes[c-1];
				if (_class.grade <= 8 + Math.ceil(mp / 4)) {
					var averages = JSON.parse(window.localStorage.getItem("c" + c + "-averages"));
					var finalavg = 0, mps = 0;
					var upto;
					if (_class.grade < 8 + Math.ceil(mp / 4)) upto = 4;
					else upto = (mp % 4 === 0) ? 4 : mp % 4;
					for (var m = 1; m <= upto; m++) {
						if (averages[m-1]) {
							finalavg += averages[m-1];
							mps++;
						}
					}
					finalavg /= mps;
					credits += _class.credits;
					unweightedpts += GradeFactory.letterToUnweightedPoints(GradeFactory.numEquivToLetter(finalavg)) * _class.credits;
					weightedpts += GradeFactory.letterToWeightedPoints(GradeFactory.numEquivToLetter(finalavg), _class.type) * _class.credits;
				}
			}
			unweightedpts /= credits;
			weightedpts /= credits;
			$scope.unweightedgpapoints.push({
				x: mp,
				y: Math.round(unweightedpts * 1000) / 1000
			});
			$scope.weightedgpapoints.push({
				x: mp,
				y: Math.round(weightedpts * 1000) / 1000
			});
		}
		for (var grade = 9; grade <= 12; grade++) {
			for (var mp = 1; mp <= 4; mp++) {
				$scope.gpalabels.push({
					grade: grade,
					mp: mp
				});
			}
		}
		var unweightedGPAProgressionChart = new Chart("unweightedGPAProgressionChart", {
		    type: 'line',
		    data: {
		    	labels: ["MP1", "MP2", "MP3", "MP4", "MP5", "MP6", "MP7", "MP8", "MP9", "MP10", "MP11", "MP12", "MP13", "MP14", "MP15", "MP16"],
		    	datasets: [{
		    		data: $scope.unweightedgpapoints,
		    		label: 'Unweighted GPA',
		    		fill: true,
		    		borderColor: 'rgb(0,181,174)',
		    		backgroundColor: 'rgba(0,181,174,0.3)',
		    		pointRadius: 3
		    	}]
	    	},
		    options: {
		    	legend: { display: false },
		    	title: {
		            display: true,
		            text: 'Unweighted GPA Progression'
		        }
		    }
		});
		var weightedGPAProgressionChart = new Chart("weightedGPAProgressionChart", {
		    type: 'line',
		    data: {
		    	labels: ["MP1", "MP2", "MP3", "MP4", "MP5", "MP6", "MP7", "MP8", "MP9", "MP10", "MP11", "MP12", "MP13", "MP14", "MP15", "MP16"],
		    	datasets: [{
		    		data: $scope.weightedgpapoints,
		    		label: 'Weighted GPA',
		    		fill: true,
		    		borderColor: 'rgb(0,181,174)',
		    		backgroundColor: 'rgba(0,181,174,0.3)',
		    		pointRadius: 3
		    	}]
	    	},
		    options: {
		    	legend: { display: false },
		    	title: {
		            display: true,
		            text: 'Weighted GPA Progression'
		        }
		    }
		});
	};

	$scope.calculateColleges = function() {
		var gpa = Math.round($scope.unweightedgpa * 10) / 10;
		if (gpa % 1 === 0) $scope.collegeslink = "https://www.collegesimply.com/guides/" + gpa + ".0-gpa-colleges/";
		else if (gpa > 4) $scope.collegeslink = "https://www.collegesimply.com/guides/4.0-gpa-colleges/";
		else $scope.collegeslink = "https://www.collegesimply.com/guides/" + gpa + "-gpa-colleges/";
	};

	$scope.initClasses = function() {
		if (!window.localStorage.getItem("gpasettings-9")) window.localStorage.setItem("gpasettings-9", true);
		if (!window.localStorage.getItem("gpasettings-10")) window.localStorage.setItem("gpasettings-10", true);
		if (!window.localStorage.getItem("gpasettings-11")) window.localStorage.setItem("gpasettings-11", true);
		if (!window.localStorage.getItem("gpasettings-12")) window.localStorage.setItem("gpasettings-12", true);
		$scope.loadAverages();
		$scope.searchClasses();
		$scope.calculateGPA();
		$scope.calculateGPAProgression();
		$scope.calculateColleges();
	};
	
	var tick = function () {
		$scope.currentdate = Date.now();
	};
	tick();
	$interval(tick, 1000);
});

$(document).ready(function () {
	$('.dropdown').dropdown();
	
	if (window.localStorage.getItem('currentgrade')) $('#gradeSelectionDropdown').dropdown('set selected', window.localStorage.getItem('currentgrade'));
	else $('#gradeSelectionDropdown').dropdown('set selected', '9');
});