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

app.filter('valueordefault', function() {
	return function(value) {
		if (value === null || value === undefined) return '-';
		else return value;
	}
});

/*function returnWithDir(v, d) {
	if (d === 1) return v;
	else return (v === 1) ? -1 : 1;
};*/

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

var ls = window.localStorage;
class LS {
	static getClass(c) {
		return JSON.parse(ls.getItem("c" + c));
	}
	static getCategory(c, cat) {
		return JSON.parse(ls.getItem("c" + c + "-cat" + cat));
	}
	static getGrade(c, g) {
		return JSON.parse(ls.getItem("c" + c + "-a" + g));
	}
	static getItem(item, parse = false) {
		return (parse) ? JSON.parse(ls.getItem(item)) : ls.getItem(item);
	}
	static setItem(item, data, parse = false) {
		if (parse) ls.setItem(item, JSON.stringify(data));
		else ls.setItem(item, data);
	}
	static incItem(item) {
		ls.setItem(item, parseInt(ls.getItem(item)) + 1);
	}
	static decItem(item) {
		ls.setItem(item, parseInt(ls.getItem(item)) - 1);
	}
	static deleteClass(c) {
		ls.removeItem("c" + c);
	}
	static deleteCategory(c, cat) {
		ls.removeItem("c" + c + "-cat" + cat);
	}
	static deleteGrade(c, g) {
		ls.removeItem("c" + c + "-a" + g);
	}
	static deleteItem(item) {
		ls.removeItem(item);
	}
}

if (!Array.prototype.last) {
	Array.prototype.last = function() {
		return this[this.length - 1];
	};
}

function calcMode(numbers) {
    var modes = [], count = [], i, number, maxIndex = 0;
    for (i = 0; i < numbers.length; i += 1) {
        number = numbers[i];
        count[number] = (count[number] || 0) + 1;
        if (count[number] > maxIndex) {
            maxIndex = count[number];
        }
    }
    for (i in count)
    if (count.hasOwnProperty(i)) {
        if (count[i] === maxIndex) {
            modes.push(Number(i));
        }
    }
    return modes;
}

function calcQuartile(data, q) {
	var pos = ((data.length) - 1) * q;
	var base = Math.floor(pos);
	var rest = pos - base;
	if( (data[base+1]!==undefined) ) {
		return data[base] + rest * (data[base+1] - data[base]);
	} else {
		return data[base];
	}
}

app.controller('MainController', function ($scope) {
	/*$scope.categories = [];
	$scope.grades = [];
	$scope.tab = 3;
	$scope.showngrades = 0;
	$scope.sort = {
		by: 2,
		dir: 1 // 1 = ascending, -1 = descending
	};
	$scope.search = {
		mp: window.localStorage.getItem('currentmp')
	};
	$scope.averages = {
		mp1: [],
		mp2: [],
		mp3: [],
		mp4: []
	};
	$scope.changeTab = function(t) {
		$scope.tab = t;
	};
	$scope.changeSort = function(b) {
		// Change $scope's sort
		if ($scope.sort.by === b) $scope.sort.dir = ($scope.sort.dir === 1) ? -1 : 1;
		else {
			$scope.sort.by = b;
			$scope.sort.dir = 1;
		}
		// Determine by which property to sort
		var property;
		switch ($scope.sort.by) {
			case 1:
				property = 'date';
				break;
			case 2:
			case 3:
			case 4:
				property = null;
				break;
			case 5:
				property = 'category';
				break;
			case 6:
				property = 'name';
				break;
		}
		// Actually sort
		$scope.grades.sort(function(a, b) {
			if (property === null) {
				if (a.ptsearned / a.ptstotal < b.ptsearned / b.ptstotal) return returnWithDir(-1, $scope.sort.dir);
				else if (a.ptsearned / a.ptstotal > b.ptsearned / b.ptstotal) return returnWithDir(1, $scope.sort.dir);
				else return 0;
			}
			else {
				if (a[property] < b[property]) return returnWithDir(-1, $scope.sort.dir);
				else if (a[property] > b[property]) return returnWithDir(1, $scope.sort.dir);
				else return 0;
			}
		});
	};*/

	// Presets
	$scope.tab = 1;
	$scope.search = {
		mp: 2
	};
	$scope.initializedAverageProgressionChart = false;
	$scope.initializedUndecilesChart = false;

	function initClass() {
		var classname = decodeURIComponent(window.location.href.split("/").last());
		for (var c = 1; c <= parseInt(LS.getItem("classcount")); c++) {
			if (LS.getClass(c).name === classname) {
				$scope.classlsid = c;
				$scope.classexists = true;
				$scope.class = LS.getClass(c);
				return;
			}
		}
		$scope.classexists = false;
	}
	
	function initCategoriesAndGradeBrackets() {
		$scope.categories = [];
		$scope.gradeBrackets = [{}, {}, {}, {}];
		for (var cat = 1; cat <= parseInt(LS.getItem("c" + $scope.classlsid + "-catcount")); cat++) {
			var category = LS.getCategory($scope.classlsid, cat);
			$scope.categories.push(category);
			for (var mp = 1; mp <= 4; mp++) {
				$scope.gradeBrackets[mp-1][category.name] = {
					percents: [],
					weight: category.weight,
					ptsearned: 0,
					ptstotal: 0
				};
			}
		}
	}
	
	function initGrades() {
		$scope.grades = [];
		$scope.mpGrades = [[], [], [], []];
		$scope.undeciles = [];
		for (var mp = 1; mp <= 4; mp++) {
			$scope.undeciles.push({"A+": 0, "A": 0, "A-": 0, "B+": 0, "B": 0, "B-": 0, "C+": 0, "C": 0, "C-": 0, "D": 0, "F": 0});
		}
		for (var g = 1; g <= parseInt(LS.getItem("c" + $scope.classlsid + "-assignmentcount")); g++) {
			var grade = LS.getGrade($scope.classlsid, g);
			grade.percent = grade.ptsearned * 100 / grade.ptstotal;
			grade.letter = GradeFactory.percentToLetter(grade.percent);
			$scope.undeciles[grade.mp-1][grade.letter]++;
			$scope.grades.push(grade);
			$scope.mpGrades[grade.mp-1].push(grade);
			
			var gradeBracket = $scope.gradeBrackets[grade.mp-1][grade.category];
			gradeBracket.percents.push(grade.percent);
			gradeBracket.ptsearned += grade.ptsearned;
			gradeBracket.ptstotal += grade.ptstotal;
		}
		$scope.grades.sort(function(g1, g2) {
			return new Date(g1.date) - new Date(g2.date);
		});
		for (var mp = 1; mp <= 4; mp++) {
			$scope.mpGrades[mp-1].sort(function(g1, g2) {
				return new Date(g1.date) - new Date(g2.date);
			});
		}
	}
	
	function initBracketBasedStatsAndAverages() {
		$scope.mpAverages = [{}, {}, {}, {}];
		$scope.yearAverageLetter;
		$scope.yearAverageNumEquiv = 0;
		$scope.totalValidMPs = 0;
		for (var mp = 1; mp <= 4; mp++) {
			var mpGradeBracket = $scope.gradeBrackets[mp-1];
			var mpAverageBracket = $scope.mpAverages[mp-1];
			var mpPoints = 0;
			var mpWeight = 0;
			for (var category in mpGradeBracket) {
				if (!mpGradeBracket.hasOwnProperty(category)) continue;
				var categoryGradeBracket = mpGradeBracket[category];
				var count = categoryGradeBracket.percents.length;
				if (count === 0) {
					categoryGradeBracket.arithmeticmean = null;
					categoryGradeBracket.geometricmean = null;
					categoryGradeBracket.harmonicmean = null;
					categoryGradeBracket.median = null;
					categoryGradeBracket.mode = null;
					categoryGradeBracket.high = null;
					categoryGradeBracket.low = null;
					categoryGradeBracket.firstqrt = null;
					categoryGradeBracket.thirdqrt = null;
					categoryGradeBracket.intqrt = null;
					categoryGradeBracket.quartdev = null;
					categoryGradeBracket.range = null;
					categoryGradeBracket.lofence = null;
					categoryGradeBracket.lifence = null;
					categoryGradeBracket.uofence = null;
					categoryGradeBracket.uifence = null;
					categoryGradeBracket.stdvar = null;
					categoryGradeBracket.stddev = null;
					categoryGradeBracket.meandev = null;
					categoryGradeBracket.count = 0;
				}
				else {
					categoryGradeBracket.percents.sort((g1, g2) => g1 - g2);
					var arithmeticmean = 0, geometricmean = 1, harmonicmean = 0, median, high = Number.MIN_VALUE, low = Number.MAX_VALUE, stdvar = 0, stddev, meandev = 0, firstqrt, thirdqrt, intqrt, quartdev, range, lofence, lifence, uofence, uifence, mode = calcMode(categoryGradeBracket.percents);
					for (var percent of categoryGradeBracket.percents) {
						arithmeticmean += percent;
						if (percent !== 0) geometricmean *= percent;
						if (percent !== 0) harmonicmean += (1/percent);
						if (percent > high) high = percent;
						if (percent < low) low = percent;
					}
					arithmeticmean /= count;
					geometricmean = Math.pow(geometricmean, 1/count);
					harmonicmean = count / harmonicmean;
					for (var percent of categoryGradeBracket.percents) {
						stdvar += Math.pow(arithmeticmean - percent, 2);
						meandev += Math.abs(arithmeticmean - percent);
					}
					stdvar /= count;
					stddev = Math.sqrt(stdvar);
					meandev /= count;
					if (count % 2 === 0) median = (categoryGradeBracket.percents[count/2] + categoryGradeBracket.percents[(count/2)-1])/2;
					else median = categoryGradeBracket.percents[Math.floor(count/2)];
					firstqrt = calcQuartile(categoryGradeBracket.percents, 0.25);
					thirdqrt = calcQuartile(categoryGradeBracket.percents, 0.75);
					intqrt = Math.abs(thirdqrt - firstqrt);
					quartdev = (thirdqrt-firstqrt)/2;
					range = high - low;
					lofence = firstqrt - (3 * intqrt);
					lifence = firstqrt - (1.5 * intqrt);
					uofence = thirdqrt + (3 * intqrt);
					uifence = thirdqrt + (1.5 * intqrt);
					categoryGradeBracket.arithmeticmean = arithmeticmean;
					categoryGradeBracket.geometricmean = geometricmean;
					categoryGradeBracket.harmonicmean = harmonicmean;
					categoryGradeBracket.median = median;
					categoryGradeBracket.mode = mode;
					categoryGradeBracket.high = high;
					categoryGradeBracket.low = low;
					categoryGradeBracket.firstqrt = firstqrt;
					categoryGradeBracket.thirdqrt = thirdqrt;
					categoryGradeBracket.intqrt = intqrt;
					categoryGradeBracket.quartdev = quartdev;
					categoryGradeBracket.range = range;
					categoryGradeBracket.lofence = lofence;
					categoryGradeBracket.lifence = lifence;
					categoryGradeBracket.uofence = uofence;
					categoryGradeBracket.uifence = uifence;
					categoryGradeBracket.stdvar = stdvar;
					categoryGradeBracket.stddev = stddev;
					categoryGradeBracket.meandev = meandev;
					categoryGradeBracket.count = count;
				}
				if (categoryGradeBracket.ptstotal === 0) {
					categoryGradeBracket.averagePercent = null;
					categoryGradeBracket.averageLetter = null;
				}
				else {
					categoryGradeBracket.averagePercent = categoryGradeBracket.ptsearned * 100 / categoryGradeBracket.ptstotal;
					categoryGradeBracket.averageLetter = GradeFactory.percentToLetter((Math.round(categoryGradeBracket.averagePercent*10)/10).toFixed(2));
					mpPoints += categoryGradeBracket.averagePercent * categoryGradeBracket.weight / 100;
					mpWeight += categoryGradeBracket.weight;
				}
			}
			if (mpWeight === 0) {
				mpAverageBracket.averagePercent = null;
				mpAverageBracket.averageLetter = null;
				mpAverageBracket.averageNumEquiv = null;
			}
			else {
				mpAverageBracket.averagePercent = mpPoints * 100 / mpWeight;
				mpAverageBracket.averageLetter = GradeFactory.percentToLetter((Math.round(mpAverageBracket.averagePercent*10)/10).toFixed(2));
				mpAverageBracket.averageNumEquiv = GradeFactory.letterToNumEquiv(mpAverageBracket.averageLetter);
				$scope.yearAverageNumEquiv += mpAverageBracket.averageNumEquiv;
				$scope.totalValidMPs++;
			}
		}
		if ($scope.totalValidMPs === 0) {
			$scope.yearAverageNumEquiv = null;
			$scope.yearAverageLetter = null;
		}
		else {
			$scope.yearAverageNumEquiv /= $scope.totalValidMPs;
			$scope.yearAverageLetter = GradeFactory.numEquivToLetter($scope.yearAverageNumEquiv);
		}
	}
	
	function initAverageProgression() {
		var pointTotals = [{}, {}, {}, {}];
		$scope.graphPoints = [[], [], [], []];
		$scope.graphDates = [[], [], [], []];
		console.log($scope.mpGrades[1]);
		for (var mp = 1; mp <= 4; mp++) {
			for (var category of $scope.categories) {
				pointTotals[mp-1][category.name] = {
					ptsearned: 0,
					ptstotal: 0,
					weight: category.weight
				};
			}
		}
		for (var mp = 1; mp <= 4; mp++) {
			for (var g = 0; g <= $scope.mpGrades[mp-1].length - 1; g++) {
				var grade = $scope.mpGrades[mp-1][g];
				if (mp === 2) console.log(pointTotals[mp-1]);
				pointTotals[mp-1][grade.category].ptsearned += grade.ptsearned;
				pointTotals[mp-1][grade.category].ptstotal += grade.ptstotal;
				if (g !== $scope.mpGrades[mp-1].length - 1) {
					if ($scope.mpGrades[mp-1][g+1].date === grade.date) continue;
				}
				var totalpoints = 0, totalweight = 0;
				for (var category in pointTotals[mp-1]) {
					if (!pointTotals[mp-1].hasOwnProperty(category) || pointTotals[mp-1][category].ptstotal === 0) continue;
					totalpoints += (pointTotals[mp-1][category].ptsearned / pointTotals[mp-1][category].ptstotal) * pointTotals[mp-1][category].weight;
					totalweight += pointTotals[mp-1][category].weight;
				}
				if (totalweight === 0) continue;
				$scope.graphDates[mp-1].push(grade.date);
				$scope.graphPoints[mp-1].push({
					x: grade.date,
					y: (totalpoints * 100 / totalweight).toFixed(2)
				});
			}
		}
	}
	
	$scope.initViewClass = function() {
		initClass();
		initCategoriesAndGradeBrackets();
		initGrades();
		initBracketBasedStatsAndAverages();
		initAverageProgression();
		console.log($scope);
	};

	// Reusable functions
	

	
	
	// Events
	$scope.$watch('search.mp', function() {
		$scope.reinitAverageProgressionChart();
		$scope.reinitUndecilesChart();
	}, true);

	var averageProgressionChart;
	$scope.reinitAverageProgressionChart = function() {
		if ($scope.initializedAverageProgressionChart) {
			averageProgressionChart.data.datasets[0].data = $scope.graphPoints[$scope.search.mp-1].slice(0);
			averageProgressionChart.data.labels = $scope.graphDates[$scope.search.mp-1].slice(0);
			averageProgressionChart.update();
		}
		else {
			averageProgressionChart = new Chart("averageProgressionChart", {
			    type: 'line',
			    data: {
			    	labels: $scope.graphDates[$scope.search.mp-1],
			    	datasets: [{
			    		data: $scope.graphPoints[$scope.search.mp-1],
			    		label: 'Average',
			    		fill: true,
			    		borderColor: 'rgb(223,36,40)',
			    		backgroundColor: 'rgba(223,36,40,0.3)',
			    		pointRadius: 4
			    	}]
		    	},
			    options: {
			    	legend: { display: false },
			    	title: {
			            display: true,
			            text: 'Average Progression'
			        },
			        scales: {
			            xAxes: [{
			            	type: 'time',
			                time: {
			                    unit: 'week',
			                    displayFormats: { week: 'MMM D' },
			                    tooltipFormat: 'MMMM DD, YYYY'
			                }
			            }],
			            yAxes: [{
			                ticks: {
			                    callback: function(value, index, values) { return value + '%'; }
			                }
			            }]
			        },
			        tooltips: {
			        	callbacks: {
			        		label: function(tooltipItem, data) {
			        			var label = data.datasets[tooltipItem.datasetIndex].label || '';
			        			if (label) {
			                        label += ': ';
			                        label += GradeFactory.percentToLetter(tooltipItem.yLabel) + ' ';
			                        label += tooltipItem.yLabel + '%';
			                        return label;
			                    }
			        		}
			        	}
			        }
			    }
			});
			$scope.initializedAverageProgressionChart = true;
		}
	};

	var undecilesChart;
	$scope.reinitUndecilesChart = function () {
		if ($scope.initializedUndecilesChart) {
			var d = $scope.undeciles[$scope.search.mp-1];
			undecilesChart.data.datasets[0].data = [d["A+"], d["A"], d["A-"], d["B+"], d["B"], d["B-"], d["C+"], d["C"], d["C-"], d["D"], d["F"]].slice(0);
			undecilesChart.update();
		}
		else {
			var d = $scope.undeciles[$scope.search.mp-1];
			undecilesChart = new Chart("undecilesChart", {
				type: 'bar',
				data: {
					labels: ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D", "F"],
					datasets: [{
						data: [d["A+"], d["A"], d["A-"], d["B+"], d["B"], d["B-"], d["C+"], d["C"], d["C-"], d["D"], d["F"]],
						label: 'Number of Assignments',
						fill: true,
			    		borderColor: 'rgb(223,36,40)',
			    		backgroundColor: 'rgba(223,36,40,0.3)',
			            borderWidth: 1
					}]
				},
				options: {
					legend: { display: false },
					title: {
						display: true,
						text: 'Grade Distribution'
					},
					scales: {
			            yAxes: [{
			                ticks: {
			                    beginAtZero: true
			                }
			            }]
			        }
				}
			});
			$scope.initializedUndecilesChart = true;
		}
	};

	$scope.addGrade = function() {
		var grade = {
			date: $scope.newgrade.date,
			mp: $scope.newgrade.mp,
			name: $scope.newgrade.name,
			ptsearned: $scope.newgrade.ptsearned,
			ptstotal: $scope.newgrade.ptstotal,
			category: $('#addGradeCategoryDropdown').val()
		};
		LS.incItem('c' + $scope.classlsid + '-assignmentcount');
		LS.setItem('c' + $scope.classlsid + '-a' + ls.getItem('c' + $scope.classlsid + '-assignmentcount'), JSON.stringify(grade));
		location.reload();
	};

	$scope.changeTab = function(t) {
		$scope.tab = t;
	};

	$scope.deleteClass = function() {
		for (var g = 1; g <= parseInt(LS.getItem("c" + $scope.classlsid + "-assignmentcount")); g++) {
			LS.deleteGrade($scope.classlsid, g);
		}
		LS.deleteItem("c" + $scope.classlsid + "-assignmentcount");
		for (var cat = 1; cat <= parseInt(LS.getItem("c" + $scope.classlsid + "-catcount")); cat++) {
			LS.deleteCategory($scope.classlsid, cat);
		}
		LS.deleteItem("c" + $scope.classlsid + "-catcount");
		LS.deleteClass($scope.classlsid);
		LS.decItem("classcount");
		window.location.href = "/classes";
	};
	
	$scope.deleteGrade = function(g) {
		var grade = LS.getGrade($scope.classlsid, g);
		if (g === parseInt(LS.getItem("c" + $scope.classlsid + "-assignmentcount"))) {
			LS.deleteItem("c" + $scope.classlsid + "-a" + g);
		}
		else {
			var acount = parseInt(LS.getItem("c" + $scope.classlsid + "-assignmentcount"));
			LS.setItem("c" + $scope.classlsid + "-a" + g, LS.getItem("c" + $scope.classlsid + "-a" + acount));
			LS.deleteItem("c" + $scope.classlsid + "-a" + acount);
		}
		LS.decItem("c" + $scope.classlsid + "-assignmentcount");
		location.reload();
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
	$('#categoryStatsGrid .info.icon').popup();
});