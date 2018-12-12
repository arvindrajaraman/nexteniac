var app = angular.module('nexteniac-viewclass', []);

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

app.filter('changetype', function() {
	return function(value) {
		if (value > 0) return "Rise";
		else if (value < 0) return "Drop";
		else return "Stagnant";
	}
});

app.filter('trendtype', function() {
	return function(value) {
		if (value > 0) return "Uptrend";
		else if (value < 0) return "Downtrend";
		else return "Stagnation";
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

app.filter('truncate', function() {
	return function(value) {
		if (value.length < 20) {

		}
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

function cardinaltoOrdinal(c) {
	switch (c) {
		case 1: return "first";
		case 2: return "second";
		case 3: return "third";
		case 4: return "fourth";
		case 5: return "fifth";
		case 6: return "sixth";
		case 7: return "seventh";
		case 8: return "eighth";
		case 9: return "ninth";
		case 10: return "tenth";
		case 11: return "eleventh";
		case 12: return "twentieth";
		case 13: return "thirteenth";
		case 14: return "fourteenth";
		case 15: return "fifteenth";
		case 16: return "sixteenth";
		case 17: return "seventeenth";
		case 18: return "eighteenth";
		case 19: return "ninteenth";
		case 20: return "twentieth";
		default: return c;
	}
}

function cardinalToOrdinalShort(c) {
	switch (c) {
		case 1: return "1st";
		case 2: return "2nd";
		case 3: return "3rd";
		default: return c + "th";
	}
}

function guessDate(month, day, weekday) {
  var y = new Date().getFullYear();
  var years = [y, y-1, y+1, y-2, y+2];
  switch (weekday) {
    case "Sun": weekday = 0; break;
    case "Mon": weekday = 1; break;
    case "Tue": weekday = 2; break;
    case "Wed": weekday = 3; break;
    case "Thu": weekday = 4; break;
    case "Fri": weekday = 5; break;
    case "Sat": weekday = 6; break;
  }
  for (var year of years) {
    var date = new Date(year, month-1, day);
    if (date.getDay() == weekday) return date;
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
	// Presets
	$scope.tab = 1;
	$scope.changesTab = 1;
	$scope.distributionTab = 1;
	$scope.achievegoalpage = 0;
	$scope.newgrades = [{}];
	$scope.search = {
		mp: parseInt(window.localStorage.getItem('currentmp'))
	};
	$scope.sort = {
		dir: 1, // 1 = ascemdimg, -1 = descending
		field: 1, // 1 = date, 2 = letter, ..., 6 = assignment name
	};
	$scope.expavgs = { mp1: "10", mp2: "10", mp3: "10", mp4: "10", final: "10" };
	$scope.initializedAverageProgressionChart = false;
	$scope.initializedCategoricalAverageProgressionChart = false;
	$scope.initializedFrequencyCharts = false;
	$scope.editmode = false;
	$scope.achievegoalstats = [];
	$scope.achievegoalavg = 10;
	$scope.currentmp = parseInt(window.localStorage.getItem('currentmp'));
	$scope.newgoalavg = 10;

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
	}
	
	function initCategoriesAndGradeBrackets() {
		$scope.categories = [];
		$scope.gradeBrackets = [{}, {}, {}, {}];
		$scope.mpaveragecalccategories = [];
		$scope.mpaveragecalcavg = 95;
		for (var cat = 1; cat <= parseInt(LS.getItem("c" + $scope.classlsid + "-catcount")); cat++) {
			var category = LS.getCategory($scope.classlsid, cat);
			$scope.categories.push(category);
			$scope.achievegoalstats.push({
				category: category.name,
				difficulty: 0,
				asgnleft: 0,
				avgpoints: 0,
				weight: category.weight
			});
			for (var mp = 1; mp <= 4; mp++) {
				$scope.gradeBrackets[mp-1][category.name] = {
					percents: [],
					weight: category.weight,
					ptsearned: 0,
					ptstotal: 0
				};
			}
			$scope.mpaveragecalccategories.push({
				category: category.name,
				weight: category.weight,
				average: 95
			});
		}
	}
	
	function initGrades() {
		$scope.grades = [];
		$scope.mpGrades = [[], [], [], []];
		for (var g = 1; g <= parseInt(LS.getItem("c" + $scope.classlsid + "-assignmentcount")); g++) {
			var grade = LS.getGrade($scope.classlsid, g);
			delete grade.$$hashKey;
			grade.percent = grade.ptsearned * 100 / grade.ptstotal;
			grade.letter = GradeFactory.percentToLetter(grade.percent);
			grade.date = new Date(grade.date);
			grade.key = g;
			grade.deleted = false;
			grade.googleURI = encodeURIComponent(grade.name + " " + $scope.class.name);
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

	function initFrequencies() {
		$scope.frequencies = [[], [], [], [], []];
		var grades = ["F", "D", "C-", "C", "C+", "B-", "B", "B+", "A-", "A", "A+"];
		for (var mp = 1; mp <= 5; mp++) {
			for (var c = 0; c <= 10; c++) {
				$scope.frequencies[mp-1].push({
					classgrade: grades[c],
					frequency: 0,
					cumulativefrequency: 0
				});
			}
		}
		for (var g = 1; g <= $scope.grades.length; g++) {
			var grade = $scope.grades[g-1];
			var percentIndex = GradeFactory.letterToNumEquiv(GradeFactory.percentToLetter(grade.ptsearned * 100 / grade.ptstotal));
			$scope.frequencies[grade.mp-1][percentIndex].frequency++;
			$scope.frequencies[4][percentIndex].frequency++;
		}
		for (var mp = 1; mp <= 5; mp++) {
			for (var c = 0; c <= 10; c++) {
				if (c === 0) {
					$scope.frequencies[mp-1][c].cumulativefrequency = $scope.frequencies[mp-1][c].frequency;
				}
				else {
					$scope.frequencies[mp-1][c].cumulativefrequency = $scope.frequencies[mp-1][c-1].cumulativefrequency + $scope.frequencies[mp-1][c].frequency;
				}
			}
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
				$scope.expavgs['mp' + mp] = mpAverageBracket.averageNumEquiv;
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
		$scope.graphPoints = [[], [], [], [], []];
		$scope.graphDates = [[], [], [], [], []];
		$scope.catAvgPoints = [{}, {}, {}, {}];
		$scope.categoricalAverageProgression = [{}, {}, {}, {}];
		$scope.catAvgFullPoints = [{}, {}, {}, {}];
		for (var mp = 1; mp <= 4; mp++) {
			for (var category of $scope.categories) {
				pointTotals[mp-1][category.name] = {
					ptsearned: 0,
					ptstotal: 0,
					weight: category.weight
				};
				$scope.catAvgPoints[mp-1][category.name] = [];
				$scope.categoricalAverageProgression[mp-1][category.name] = [];
				$scope.catAvgFullPoints[mp-1][category.name] = [];
			}
		}
		for (var mp = 1; mp <= 4; mp++) {
			for (var g = 0; g <= $scope.mpGrades[mp-1].length - 1; g++) {
				var grade = $scope.mpGrades[mp-1][g];
				pointTotals[mp-1][grade.category].ptsearned += grade.ptsearned;
				pointTotals[mp-1][grade.category].ptstotal += grade.ptstotal;
				var totalpoints = 0, totalweight = 0;
				for (var category in pointTotals[mp-1]) {
					if (!pointTotals[mp-1].hasOwnProperty(category) || pointTotals[mp-1][category].ptstotal === 0) continue;
					totalpoints += (pointTotals[mp-1][category].ptsearned / pointTotals[mp-1][category].ptstotal) * pointTotals[mp-1][category].weight;
					totalweight += pointTotals[mp-1][category].weight;
				}
				$scope.catAvgPoints[mp-1][grade.category].push(grade.date);
				$scope.categoricalAverageProgression[mp-1][grade.category].push({
					x: grade.date,
					y: (pointTotals[mp-1][grade.category].ptsearned * 100 / pointTotals[mp-1][grade.category].ptstotal).toFixed(2)
				});
				$scope.catAvgFullPoints[mp-1][grade.category].push({
					x: grade.date,
					y: (totalpoints * 100 / totalweight).toFixed(2)
				});
				if (totalweight === 0) continue;
				if (g !== $scope.mpGrades[mp-1].length - 1) {
					if (grade.date.getTime() === $scope.mpGrades[mp-1][g+1].date.getTime()) continue;
				}
				$scope.graphDates[mp-1].push(grade.date);
				$scope.graphPoints[mp-1].push({
					x: grade.date,
					y: (totalpoints * 100 / totalweight).toFixed(2)
				});
				$scope.graphDates[4].push(grade.date);
				$scope.graphPoints[4].push({
					x: grade.date,
					y: (totalpoints * 100 / totalweight).toFixed(2)
				});
			}
		}
	}

	function initInsights() {
		$scope.insights = [{}, {}, {}, {}];
		$scope.averageChanges = [[], [], [], []];
		$scope.averageTrends = [[], [], [], []];
		for (var mp = 1; mp <= 4; mp++) {
			if ($scope.graphPoints[mp-1].length <= 1) continue;
			for (var g = 1; g <= $scope.graphPoints[mp-1].length - 1; g++) {
				var change = {
					startDate: $scope.graphDates[mp-1][g-1],
					endDate: $scope.graphDates[mp-1][g],
					change: $scope.graphPoints[mp-1][g].y - $scope.graphPoints[mp-1][g-1].y,
				};
				change.days = Math.abs((new Date(change.endDate).getTime() - new Date(change.startDate).getTime())/(24*60*60*1000));
				$scope.averageChanges[mp-1].push(change);
			}
			var insights = {
				biggestDrop: Math.min.apply(Math, $scope.averageChanges[mp-1].map(function(o) { return o.change; })),
				biggestRise: Math.max.apply(Math, $scope.averageChanges[mp-1].map(function(o) { return o.change; }))
			};
			insights.biggestDropEndDate = $scope.graphDates[mp-1][$scope.averageChanges[mp-1].map(function(e) {return e.change;}).indexOf(insights.biggestDrop) + 1];
			insights.biggestDropStartDate = $scope.graphDates[mp-1][$scope.averageChanges[mp-1].map(function(e) {return e.change;}).indexOf(insights.biggestDrop)];
			insights.biggestRiseEndDate = $scope.graphDates[mp-1][$scope.averageChanges[mp-1].map(function(e) {return e.change;}).indexOf(insights.biggestRise) + 1];
			insights.biggestRiseStartDate = $scope.graphDates[mp-1][$scope.averageChanges[mp-1].map(function(e) {return e.change;}).indexOf(insights.biggestRise)];
			if (insights.biggestRise < 0) {
				insights.biggestRise = 0;
				insights.biggestRiseEndDate = $scope.mpGrades[mp-1][$scope.mpGrades[mp-1].length - 1].date;
				insights.biggestRiseStartDate = $scope.mpGrades[mp-1][0].date;
			}
			else if (insights.biggestDrop >= 0) {
				insights.biggestDrop = 0;
				insights.biggestDropEndDate = $scope.mpGrades[mp-1][$scope.mpGrades[mp-1].length - 1].date;
				insights.biggestDropStartDate = $scope.mpGrades[mp-1][0].date;
			}
			var sign, startindex = 0, net = 0;
			for (var t = 0; t <= $scope.averageChanges[mp-1].length - 1; t++) {
				var value = $scope.averageChanges[mp-1][t].change;
				if (t === 0) {
					if (value > 0) sign = 1;
					else if (value < 0) sign = -1;
					else sign = 0;
					net += value;
				}
				else {
					if (value === 0) continue;
					else if (sign * value > 0)  net += value;
					else {
						var trend = {
							net: net,
							startDate: $scope.graphDates[mp-1][startindex],
							endDate: $scope.graphDates[mp-1][t]
						};
						trend.days = Math.abs((new Date(trend.endDate).getTime() - new Date(trend.startDate).getTime())/(24*60*60*1000));
						$scope.averageTrends[mp-1].push(trend);
						if (value > 0) sign = 1;
						else if (value < 0) sign = -1;
						else sign = 0;
						startindex = t;
						net = value;
					}
				}
			}
			var trend = {
				net: net,
				startDate: $scope.graphDates[mp-1][startindex],
				endDate: $scope.graphDates[mp-1][t]
			};
			trend.days = Math.abs((new Date(trend.endDate).getTime() - new Date(trend.startDate).getTime())/(24*60*60*1000));
			$scope.averageTrends[mp-1].push(trend);
			insights.biggestDowntrend = Math.min.apply(Math, $scope.averageTrends[mp-1].map(function(o) { return o.net; }));
			insights.biggestUptrend = Math.max.apply(Math, $scope.averageTrends[mp-1].map(function(o) { return o.net; }));
			for (var trend of $scope.averageTrends[mp-1]) {
				if (trend.net === insights.biggestDowntrend) {
					insights.biggestDowntrendStartDate = trend.startDate;
					insights.biggestDowntrendEndDate = trend.endDate;
				}
				else if (trend.net === insights.biggestUptrend) {
					insights.biggestUptrendStartDate = trend.startDate;
					insights.biggestUptrendEndDate = trend.endDate;
				}
			}
			if ($scope.averageTrends[mp-1].length <= 1) {
				if (insights.biggestUptrend >= 0) {
					insights.biggestDowntrend = 0;
				}
				else {
					insights.biggestUptrend = 0;
				}
				insights.biggestUptrendStartDate = $scope.mpGrades[mp-1][0].date;
				insights.biggestUptrendEndDate = $scope.mpGrades[mp-1][$scope.mpGrades[mp-1].length - 1].date;
				insights.biggestDowntrendStartDate = $scope.mpGrades[mp-1][0].date;
				insights.biggestDowntrendEndDate = $scope.mpGrades[mp-1][$scope.mpGrades[mp-1].length - 1].date;
			}
			$scope.insights[mp-1] = insights;
		}
	}

	function updateAverages() {
		if (!$scope.class.isfullfeaturedclass) return;
		var averages = [];
		for (var mp = 1; mp <= 4; mp++) {
			averages.push($scope.mpAverages[mp-1].averageNumEquiv);
		}
		LS.setItem("c" + $scope.classlsid + "-averages", averages, true);
	}

	function findLowestPossibleAverage() {
		var currentmp = parseInt(window.localStorage.getItem("currentmp")) - 1;
		var averages = JSON.parse(window.localStorage.getItem("c" + $scope.classlsid + "-averages"));
		var goalaverage = parseInt($scope.class.goalaverage);
		var average = 0;
		for (var mp = 1; mp <= currentmp; mp++) {
			if (averages[mp-1]) average += averages[mp-1];
			else average += 10;
		}
		for (var mp = 1; mp <= 3 - currentmp; mp++) {
			average += 10;
		}
		average /= 4;
		var experimentalavg = 0;
		while (GradeFactory.letterToNumEquiv(GradeFactory.numEquivToLetter(average + (experimentalavg / 4))) < goalaverage) {
			experimentalavg++;
		}
		$scope.lowestPossibleAverage = (experimentalavg <= 10) ? experimentalavg : null;
	};

	function generateTips() { // TODO MAKE TIPS SEPARATE FOR EACH MARKING PERIOD
		var condensedgradebrackets = [];
		var currgradebracket = $scope.gradeBrackets[$scope.currentmp-1];
		for (var gradebracket in currgradebracket) {
			if (!currgradebracket.hasOwnProperty(gradebracket)) continue;
			var bracket = {
				percent: currgradebracket[gradebracket].averagePercent,
				name: gradebracket,
				weight: currgradebracket[gradebracket].weight,
			};
			if (bracket.percent == null) {
				bracket.upwardpotential = 0.00001;
				bracket.volatility = 100;
			}
			else {
				bracket.upwardpotential = bracket.weight - (bracket.weight * (bracket.percent / 100));
				bracket.volatility = bracket.percent - (currgradebracket[gradebracket].ptsearned * 100 / (currgradebracket[gradebracket].ptstotal + (currgradebracket[gradebracket].ptstotal / currgradebracket[gradebracket].count)));
			}
			condensedgradebrackets.push(bracket);
		}
		condensedgradebrackets.sort((a,b) => (a.volatility < b.volatility) ? 1 : ((b.volatility < a.volatility) ? -1 : 0));
		for (var b = 1; b <= condensedgradebrackets.length; b++) {
			condensedgradebrackets[b-1].volatilityhierarchy = "This category has the " + cardinaltoOrdinal(b) + " most volatility.";
			condensedgradebrackets[b-1].vrank = cardinalToOrdinalShort(b);
		}
		condensedgradebrackets.sort((a,b) => (a.percent < b.percent) ? 1 : ((b.percent < a.percent) ? -1 : 0));
		for (var b = 1; b <= condensedgradebrackets.length; b++) {
			if (condensedgradebrackets[b-1].percent !== null) {
				condensedgradebrackets[b-1].percenthierarchy = "This category has the " + cardinaltoOrdinal(b) + " most highest average.";
				condensedgradebrackets[b-1].prank = cardinalToOrdinalShort(b);
			}
			else {
				condensedgradebrackets[b-1].percenthierarchy = "This category has no assignments in it yet and no average.";
				condensedgradebrackets[b-1].prank = "-";
			}
		}
		condensedgradebrackets.sort((a,b) => (a.weight < b.weight) ? 1 : ((b.weight < a.weight) ? -1 : 0));
		for (var b = 1; b <= condensedgradebrackets.length; b++) {
			condensedgradebrackets[b-1].weighthierarchy = "This category has the " + cardinaltoOrdinal(b) + " most weight.";
			condensedgradebrackets[b-1].wrank = cardinalToOrdinalShort(b);
		}
		condensedgradebrackets.sort((a,b) => (a.upwardpotential < b.upwardpotential) ? 1 : ((b.upwardpotential < a.upwardpotential) ? -1 : 0));
		for (var b = 1; b <= condensedgradebrackets.length; b++) {
			if (condensedgradebrackets[b-1].upwardpotential > 1)
				condensedgradebrackets[b-1].upwardpotentialhierarchy = "This category has the " + cardinaltoOrdinal(b) + " most upward potential.";
			else
				condensedgradebrackets[b-1].upwardpotentialhierarchy = "This category has very little upward potential.";
			condensedgradebrackets[b-1].urank = cardinalToOrdinalShort(b);
		}
		for (var b = 1; b <= condensedgradebrackets.length; b++) {
			condensedgradebrackets[b-1].tips = getTips(condensedgradebrackets[b-1].name, $scope.class.subject, b);
		}

		var newbrackets = [];
		for (var b = 1; b <= 3; b++) {
			if (condensedgradebrackets[b-1]) newbrackets.push(condensedgradebrackets[b-1]);
		}
		$scope.condensedgradebrackets = newbrackets;

		$scope.tutoringinfo = {};
		switch ($scope.class.subject) {
			case "English":
				$scope.tutoringinfo.title = "English Tutoring";
				$scope.tutoringinfo.info = [
					"Go after school to room 205 during these dates: Oct 17, Nov 14, Dec 12, Jan 16, Feb 27, Mar 27, Apr 10, and May 22.",
					"Courtesy of National English Honors Society."
				];
				break;
			case "Science":
			case "Mathematics":
				$scope.tutoringinfo.title = "Science & Math Tutoring";
				$scope.tutoringinfo.info = [
					"Go after school to room 230 from 2:45pm-3:45pm during Mondays & Thursdays (starting Nov 12)!",
					"Courtesy of National Science Honors Society."
				];
				break;
			case "History":
				$scope.tutoringinfo.title = "Social Studies Tutoring";
				$scope.tutoringinfo.info = [
					"Go after school to room 115 during Thursdays, but contact Mr. Pierce to make sure there is a tutor for you.",
					"Courtesy of National Social Studies Honors Society."
				];
				break;
			case "World Language":
				$scope.tutoringinfo.title = "Language Tutoring";
				$scope.tutoringinfo.info = [
					"Spanish HS: Go to the school library on Mondays, Wednesdays, & Thursdays, or your study hall (inform your Spanish teacher).",
					"French HS: Contact Ms. Reusch for a tutor.",
					"Latin HS: Contact Ms. Hasner for a tutor."
				];
				break;
			default:
				$scope.tutoringinfo.title = "Tutoring";
				$scope.tutoringinfo.info = [
					"Contact your guidance counselor to set up tutoring during your study hall.",
					"Courtesy of National Honors Society."
				];
		}
		//console.log(condensedgradebrackets);
	};
	
	$scope.initViewClass = function() {
		initClass();
		initCategoriesAndGradeBrackets();
		initGrades();
		initFrequencies();
		initBracketBasedStatsAndAverages();
		initAverageProgression();
		initInsights();
		updateAverages();
		findLowestPossibleAverage();
		generateTips();
		$scope.edit = {
			name: $scope.class.name,
			grade: $scope.class.grade,
			type: $scope.class.type,
			credits: $scope.class.credits
		};
		console.log($scope);
	};
	
	// Events
	$scope.$watch('search.mp', function() {
		$scope.reinitAverageProgressionChart();
		$scope.reinitFrequencyChart();
		$scope.reinitCategoricalAverageProgressionChart();
	}, true);

	$scope.$watch('search.category', function() {
		$scope.reinitCategoricalAverageProgressionChart();
	}, true);

	$scope.$watch('distributionTab', function() {
		$scope.reinitFrequencyChart();
	}, true);

	var calcExpFinalAvg = function() {
		$scope.expavgs.final = (parseInt($scope.expavgs.mp1) + parseInt($scope.expavgs.mp2) + parseInt($scope.expavgs.mp3) + parseInt($scope.expavgs.mp4)) / 4;
	}

	$scope.$watch('expavgs.mp1', calcExpFinalAvg, true);
	$scope.$watch('expavgs.mp2', calcExpFinalAvg, true);
	$scope.$watch('expavgs.mp3', calcExpFinalAvg, true);
	$scope.$watch('expavgs.mp4', calcExpFinalAvg, true);

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
			    		borderColor: 'rgb(0,181,174)',
			    		backgroundColor: 'rgba(0,181,174,0.3)',
			    		pointRadius: 3
			    	}]
		    	},
			    options: {
			    	layout: {
					    padding: {
					    	top: 5
					    }
					},
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

	var categoricalAverageProgressionChart;
	$scope.reinitCategoricalAverageProgressionChart = function() {
		if ($scope.initializedCategoricalAverageProgressionChart) {
			categoricalAverageProgressionChart.data.datasets[0].data = $scope.categoricalAverageProgression[$scope.search.mp-1][$scope.search.category].slice(0);
			categoricalAverageProgressionChart.data.datasets[1].data = $scope.catAvgFullPoints[$scope.search.mp-1][$scope.search.category].slice(0);
			categoricalAverageProgressionChart.data.datasets[0].label = $scope.search.category + ' Average';
			categoricalAverageProgressionChart.data.labels = $scope.catAvgPoints[$scope.search.mp-1][$scope.search.category].slice(0);
			categoricalAverageProgressionChart.update();
		}
		else {
			categoricalAverageProgressionChart = new Chart("categoricalAverageProgressionChart", {
			    type: 'line',
			    data: {
			    	labels: $scope.catAvgPoints[$scope.search.mp-1][$scope.search.category].slice(0),
			    	datasets: [{
			    		data: $scope.categoricalAverageProgression[$scope.search.mp-1][$scope.search.category].slice(0),
			    		label: $scope.search.category + ' Average',
			    		fill: false,
			    		borderColor: 'rgb(0,181,174)',
			    		backgroundColor: 'rgba(0,181,174,0.3)',
			    		pointRadius: 3
			    	}, {
			    		data: $scope.catAvgFullPoints[$scope.search.mp-1][$scope.search.category].slice(0),
			    		label: 'MP Average',
			    		fill: false,
			    		borderColor: 'rgb(234,28,137)',
			    		backgroundColor: 'rgba(234,28,137,0.3)',
			    		pointRadius: 3
			    	}]
		    	},
			    options: {
			    	layout: {
					    padding: {
					    	top: 0
					    }
					},
			    	legend: { 
			    		display: true,
			    		position: 'bottom'
			    	},
			    	title: { display: false },
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
			$scope.initializedCategoricalAverageProgressionChart = true;
		}
	};

	var charts = [];
	$scope.reinitFrequencyChart = function() {
		var chartData = [[], []];
		var fields = ['frequency', 'cumulativefrequency'];
		var labels = ['Frequency', 'Cumulative Frequency'];
		for (var _class of $scope.frequencies[$scope.search.mp-1]) {
			chartData[0].push(_class.frequency);
			chartData[1].push(_class.cumulativefrequency);
		}
		if ($scope.initializedFrequencyCharts) {
			for (var c = 1; c <= 2; c++) {
				charts[c-1].data.datasets[0].data = chartData[c-1].slice(0);
				charts[c-1].data.datasets[0].label = labels[c-1];
				charts[c-1].options.title.text = 'Grade ' + labels[c-1];
				charts[c-1].update();
			}
		}
		else {
			var chartNames = ['frequencyChart', 'cumulativeFrequencyChart'];
			for (var c = 1; c <= 2; c++) {
				charts.push(new Chart(chartNames[c-1], {
					type: 'bar',
					data: {
						labels: ["F", "D", "C-", "C", "C+", "B-", "B", "B+", "A-", "A", "A+"],
						datasets: [{
							data: chartData[c-1],
							label: labels[c-1],
							fill: true,
				    		borderColor: 'rgb(0,181,174)',
				    		backgroundColor: 'rgba(0,181,174,0.3)',
				            borderWidth: 1
						}]
					},
					options: {
						legend: { display: false },
						title: {
							display: true,
							text: 'Grade ' + labels[c-1]
						},
						scales: {
				            yAxes: [{
				                ticks: {
				                    beginAtZero: true
				                }
				            }]
				        }
					}
				}));
			}
			$scope.initializedFrequencyCharts = true;
		}
	};

	$scope.addGrades = function() {
		var fields = ["date", "category", "name", "mp", "ptsearned", "ptstotal"];
		var valid = true;
		for (var g = 0; g <= $scope.newgrades.length - 1; g++) {
			for (var f = 0; f <= fields.length - 1; f++) {
				var value = $scope.newgrades[g][fields[f]];
				if (value !== undefined && value !== "") {
					document.getElementById('AGM' + fields[f] + g).classList.remove('error');
				}
				else {
					valid = false;
					document.getElementById('AGM' + fields[f] + g).classList.add('error');
				}
			}
		}
		if (valid) {
			for (var newgrade of $scope.newgrades) {
				LS.incItem('c' + $scope.classlsid + '-assignmentcount');
				LS.setItem("c" + $scope.classlsid + "-a" + LS.getItem("c" + $scope.classlsid + "-assignmentcount"), JSON.stringify(newgrade));
			}
			location.reload();
		}
	};

	$scope.setExpValue = function(v) {
		$scope.expavgs['mp' + v[0]] = v.substr(1);
	};

	$scope.changeTab = function(t) {
		if (!$scope.editmode) $scope.tab = t;
	};

	$scope.changeMP = function(mp) {
		if (!$scope.editmode) $scope.search.mp = mp;
	};

	$scope.changeChangesTab = function(t) {
		$scope.changesTab = t;
	};

	$scope.changeDistributionTab = function(t) {
		$scope.distributionTab = t;
	};

	$scope.createRow = function() {
		$scope.newgrades.push({});
	};

	$scope.sortGrades = function(f) {
		var dir;
		if ($scope.sort.field === f) {
			$scope.sort.dir = ($scope.sort.dir === 1) ? -1 : 1;
		}
		else {
			$scope.sort.dir = 1;
		}
		dir = $scope.sort.dir;
		$scope.sort.field = f;

		if (f === 1 && dir === 1) {
			for (var mp = 1; mp <= 4; mp++) {
				$scope.mpGrades[mp-1].sort(function(g1, g2) {
					return new Date(g1.date) - new Date(g2.date);
				});
			}
		}
		else if (f === 1 && dir === -1) {
			for (var mp = 1; mp <= 4; mp++) {
				$scope.mpGrades[mp-1].sort(function(g1, g2) {
					return new Date(g2.date) - new Date(g1.date);
				});
			}
		}
		else if ((f === 2 || f === 3 || f === 4) && dir === 1) {
			for (var mp = 1; mp <= 4; mp++) {
				$scope.mpGrades[mp-1].sort(function(g1, g2) {
					return new Date(g1.percent) - new Date(g2.percent);
				});
			}
		}
		else if ((f === 2 || f === 3 || f === 4) && dir === -1) {
			for (var mp = 1; mp <= 4; mp++) {
				$scope.mpGrades[mp-1].sort(function(g1, g2) {
					return new Date(g2.percent) - new Date(g1.percent);
				});
			}
		}
		else if (f === 5 && dir === 1) {
			for (var mp = 1; mp <= 4; mp++) {
				$scope.mpGrades[mp-1].sort(function(g1, g2) {
					if (g1.category < g2.category) return -1;
				    if (g1.category > g2.category) return 1;
				    return 0;
				});
			}
		}
		else if (f === 5 && dir === -1) {
			for (var mp = 1; mp <= 4; mp++) {
				$scope.mpGrades[mp-1].sort(function(g1, g2) {
					if (g1.category > g2.category) return -1;
				    if (g1.category < g2.category) return 1;
				    return 0;
				});
			}
		}
		else if (f === 6 && dir === 1) {
			for (var mp = 1; mp <= 4; mp++) {
				$scope.mpGrades[mp-1].sort(function(g1, g2) {
					if (g1.name < g2.name) return -1;
				    if (g1.name > g2.name) return 1;
				    return 0;
				});
			}
		}
		else if (f === 6 && dir === -1) {
			for (var mp = 1; mp <= 4; mp++) {
				$scope.mpGrades[mp-1].sort(function(g1, g2) {
					if (g1.name > g2.name) return -1;
				    if (g1.name < g2.name) return 1;
				    return 0;
				});
			}
		}
	};

	$scope.toggleEditMode = function() {
		if ($scope.editmode) {
			// Edit
			for (var mp = 1; mp <= 4; mp++) {
				var grades = $scope.mpGrades[mp-1];
				for (var g = 1; g <= grades.length; g++) {
					var grade = grades[g-1];
					window.localStorage.setItem("c" + $scope.classlsid + "-a" + grade.key, JSON.stringify({
						category: grade.category,
						date: grade.date,
						mp: grade.mp,
						name: grade.name,
						ptsearned: parseFloat(grade.ptsearned),
						ptstotal: parseFloat(grade.ptstotal)
					}));
				}
			}
			// Delete
			var todelete = [];
			for (var mp = 1; mp <= 4; mp++) {
				var grades = $scope.mpGrades[mp-1];
				for (var g = 1; g <= grades.length; g++) {
					if (grades[g-1].deleted) todelete.push(grades[g-1].key);
				}
			}
			$scope.grades.sort(function (a, b) {
				if (a.key < b.key)
			    	return -1;
				if (a.key > b.key)
			    	return 1;
				return 0;
			});
			var gradecount = $scope.grades.length;
			for (var key of todelete) {
				if (key === gradecount) {
					window.localStorage.removeItem("c" + $scope.classlsid + "-a" + gradecount);
				}
				else {
					var deletedgrade = JSON.parse(window.localStorage.getItem("c" + $scope.classlsid + "-a" + gradecount));
					window.localStorage.removeItem("c" + $scope.classlsid + "-a" + gradecount);
					window.localStorage.setItem("c" + $scope.classlsid + "-a" + key, JSON.stringify({
						category: deletedgrade.category,
						date: deletedgrade.date,
						mp: deletedgrade.mp,
						name: deletedgrade.name,
						ptsearned: deletedgrade.ptsearned,
						ptstotal: deletedgrade.ptstotal
					}));
				}
				gradecount--;
				window.localStorage.setItem("c" + $scope.classlsid + "-assignmentcount", parseInt(window.localStorage.getItem("c" + $scope.classlsid + "-assignmentcount")) - 1);
			}
			location.reload();
		}
		$scope.editmode = !$scope.editmode;
	};

	$scope.deleteExpGrade = function(j) {
		var grade = $scope.mpGrades[$scope.search.mp-1][j];
		$scope.mpGrades[$scope.search.mp-1].splice(j, 1);
		$scope.grades = [];
		for (var mp = 1; mp <= 4; mp++) {
			for (var i = 1; i <= $scope.mpGrades[mp-1].length; i++) {
				$scope.grades.push($scope.mpGrades[mp-1][i-1]);
			}
		}
		var gradeBracket = $scope.gradeBrackets[grade.mp-1][grade.category];
		for (var p = 1; p <= gradeBracket.percents.length; p++) {
			if (gradeBracket.percents[p-1] === grade.percent) {
				gradeBracket.percents.splice(p-1, 1);
				break;
			}
		}
		gradeBracket.ptsearned -= grade.ptsearned;
		gradeBracket.ptstotal -= grade.ptstotal;
		gradeBracket = {
			percents: gradeBracket.percents,
			ptsearned: gradeBracket.ptsearned,
			ptstotal: gradeBracket.ptstotal
		};
		$scope.grades.sort(function(g1, g2) {
			return new Date(g1.date) - new Date(g2.date);
		});
		$scope.mpGrades[$scope.search.mp-1].sort(function(g1, g2) {
			return new Date(g1.date) - new Date(g2.date);
		});
		initFrequencies();
		initBracketBasedStatsAndAverages();
		initAverageProgression();
		initInsights();
		updateAverages();
		findLowestPossibleAverage();
		$scope.reinitAverageProgressionChart();
		$scope.reinitCategoricalAverageProgressionChart();
		$scope.reinitFrequencyChart();
	};

	$scope.addExpGrade = function() {
		var grade = {
			name: $scope.expgrade.name,
			category: $scope.expgrade.category,
			date: new Date($scope.expgrade.date),
			deleted: false,
			key: null,
			mp: $scope.search.mp,
			ptsearned: parseFloat($scope.expgrade.ptsearned),
			ptstotal: parseFloat($scope.expgrade.ptstotal)
		};
		grade.percent = (grade.ptsearned / grade.ptstotal) * 100;
		grade.letter = GradeFactory.percentToLetter(grade.percent);
		$scope.mpGrades[$scope.search.mp-1].push(grade);
		$scope.grades.push(grade);
		var gradeBracket = $scope.gradeBrackets[grade.mp-1][grade.category];
		gradeBracket.percents.push(grade.percent);
		gradeBracket.ptsearned += grade.ptsearned;
		gradeBracket.ptstotal += grade.ptstotal;
		gradeBracket = {
			percents: gradeBracket.percents,
			ptsearned: gradeBracket.ptsearned,
			ptstotal: gradeBracket.ptstotal
		};
		$scope.grades.sort(function(g1, g2) {
			return new Date(g1.date) - new Date(g2.date);
		});
		$scope.mpGrades[$scope.search.mp-1].sort(function(g1, g2) {
			return new Date(g1.date) - new Date(g2.date);
		});
		initFrequencies();
		initBracketBasedStatsAndAverages();
		initAverageProgression();
		initInsights();
		updateAverages();
		findLowestPossibleAverage();
		$scope.reinitAverageProgressionChart();
		$scope.reinitCategoricalAverageProgressionChart();
		$scope.reinitFrequencyChart();
	};

	$scope.toggleDeleted = function(mp, index) {
		$scope.mpGrades[mp][index].deleted = !$scope.mpGrades[mp][index].deleted;
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

	$scope.deleteNewGrade = function(index) {
		$scope.newgrades.splice(index, 1);
	};

	$scope.editClass = function() {
		var _class = JSON.parse(window.localStorage.getItem("c" + $scope.classlsid));
		_class.name = $scope.edit.name;
		_class.credits = $scope.edit.credits;
		_class.type = $scope.edit.type;
		_class.grade = $scope.edit.grade;
		_class.subject = $scope.edit.subject;
		window.localStorage.setItem("c" + $scope.classlsid, JSON.stringify(_class));
		window.location.href = "/classes/" + _class.name;
	};

	$scope.deleteClass = function() {
		for (var a = 1; a <= parseInt(window.localStorage.getItem("c" + $scope.classlsid + "-assignmentcount")); a++) {
			window.localStorage.removeItem("c" + $scope.classlsid + "-a" + a);
		}
		for (var cat = 1; cat <= parseInt(window.localStorage.getItem("c" + $scope.classlsid + "-catcount")); cat++) {
			window.localStorage.removeItem("c" + $scope.classlsid + "-cat" + cat);
		}
		window.localStorage.removeItem("c" + $scope.classlsid);
		window.localStorage.removeItem("c" + $scope.classlsid + "-assignmentcount");
		window.localStorage.removeItem("c" + $scope.classlsid + "-catcount");
		window.localStorage.removeItem("c" + $scope.classlsid + "-averages");
		window.localStorage.setItem("classcount", parseInt(window.localStorage.getItem("classcount")) - 1);
		window.location.href = "/classes";
	};

	$scope.achieveYourGoal = function() {
		// Step 1
		var ptsaway;
		switch (parseInt($scope.achievegoalavg)) {
			case 10: ptsaway = 96.5; break;
			case 9: ptsaway = 92.5; break;
			case 8: ptsaway = 89.5; break;
			case 7: ptsaway = 86.5; break;
			case 6: ptsaway = 82.5; break;
			case 5: ptsaway = 79.5; break;
			case 4: ptsaway = 76.5; break;
			case 3: ptsaway = 72.5; break;
			case 2: ptsaway = 69.5; break;
			case 1: ptsaway = 64.5; break;
			case 0: ptsaway = 1; break;
		}
		ptsaway -= $scope.mpAverages[$scope.currentmp - 1].averagePercent;
		ptsaway = Math.ceil(ptsaway * 100) / 100;
		// Step 2
		var totaldifficulty = 0;
		var catwhitelist = {};
		for (var stat of $scope.achievegoalstats) {
			if (stat.weight === 0 || stat.asgnleft === 0) continue;
			catwhitelist[stat.category] = true;
			totaldifficulty += parseFloat(stat.difficulty);
		}
		// Step 2A
		var categoricalptsaway = {};
		for (var stat of $scope.achievegoalstats) {
			if (stat.weight === 0 || stat.asgnleft === 0) continue;
			categoricalptsaway[stat.category] = ptsaway * parseFloat(stat.difficulty) / totaldifficulty;
		}
		// Step 2B
		$scope.nextscores = [];
		for (var stat of $scope.achievegoalstats) {
			if (stat.weight === 0 || stat.asgnleft === 0) continue;
			var A = $scope.gradeBrackets[$scope.currentmp-1][stat.category].count, B = stat.asgnleft, C = $scope.gradeBrackets[$scope.currentmp-1][stat.category].averagePercent, D = categoricalptsaway[stat.category];
			if (!C) C = $scope.mpAverages[$scope.currentmp-1].averagePercent;
			var nextscores = (((C+D)*(A+B)) - (A*C))/B;
			// Step 2C
			if (nextscores > 100) {
				catwhitelist[stat.category] = false;
				var ptsleft = ((C*A)+(100*B))/(A+B);
				ptsleft = ptsleft - (C + categoricalptsaway[stat.category]);

				var newtotaldifficulty = 0;
				for (var stat2 of $scope.achievegoalstats) {
					if (!catwhitelist[stat2.category]) continue;
					newtotaldifficulty += stat2.weight;
				}
				for (var stat2 of $scope.achievegoalstats) {
					if (!catwhitelist[stat2.category]) continue;
					categoricalptsaway[stat2.category] += (parseFloat(stat2.difficulty) * ptsleft / newtotaldifficulty);
				}
				categoricalptsaway[stat.category] = 0;
			}
			else $scope.nextscores.push({category: stat.category, nextscores: Math.ceil(nextscores)});
		}
	};

	$scope.decAchieveGoalPage = function() {
		$scope.achievegoalpage--;
		if ($scope.achievegoalpage === 4) $scope.achieveYourGoal();
	}

	$scope.incAchieveGoalPage = function() {
		$scope.achievegoalpage++;
		if ($scope.achievegoalpage === 4) $scope.achieveYourGoal();
	}

	$scope.changeGoalAverage = function() {
		$scope.class.goalaverage = $scope.newgoalavg;
		delete $scope.class.$$hashKey;
		window.localStorage.setItem("c" + $scope.classlsid, JSON.stringify($scope.class));
		location.reload();
	}

	$scope.incMPCalcAverage = function(i) {
		$scope.mpaveragecalccategories[i].average++;
		var totalaverage = 0;
		for (var category of $scope.mpaveragecalccategories) {
			totalaverage += (category.weight * (category.average / 100));
		}
		$scope.mpaveragecalcavg = totalaverage;
	}

	$scope.decMPCalcAverage = function(i) {
		$scope.mpaveragecalccategories[i].average--;
		var totalaverage = 0;
		for (var category of $scope.mpaveragecalccategories) {
			totalaverage += (category.weight * (category.average / 100));
		}
		$scope.mpaveragecalcavg = totalaverage;
	}

	$scope.parseGenesisGrades = function() {
		/* Repeat same code X times for a certain number of lines */
	    /* delete a line starting with x (e.g. x0.0), skip an assignment that is missing (MI), incomplete (INC), or exempt (EX) */
	    /* skip the line that contains the course */
	    var lines = $("#enterGradesTextarea").val().split("\n");
	    $scope.newgrades = [];
	    for (var i = 0; i <= (lines.length/5) - 1; i++) {
	      var mp = lines[i*5][2];
	      var assignment = lines[(i*5)+3].split("\t");
	      var pts = assignment[3].split(" / ");
	      var datecomp = lines[(i*5)+2].split("/");

	      var category = assignment[1];
	      var name = assignment[2];
	      var ptsearned = pts[0];
	      var ptstotal = pts[1];
	      var date = guessDate(parseInt(datecomp[0]), parseInt(datecomp[1]), lines[(i*5)+1]);
	      
	      $scope.newgrades.push({
	        mp: mp,
	        name: name,
	        category: category,
	        ptsearned: parseFloat(ptsearned),
	        ptstotal: parseFloat(ptstotal),
	        date: date
	      });
	    }

	    lines = $("#enterGradesTextarea").val().split("\n");
	    var categoriesfound = {};
	    for (var i = 0; i <= (lines.length/5) - 1; i++) {
	      var mp = lines[i*5][2];
	      var assignment = lines[(i*5)+3].split("\t");
	      var category = assignment[1];
	      categoriesfound[category] = {
	        old: category,
	        mapto: ""
	      };
	    }
	    $scope.categoriesfound = categoriesfound;
	    $scope.simplecategories = [];
	    for (var category of $scope.categories) {
	    	$scope.simplecategories.push(category.name);
	    }
	}

  	$scope.mapGenesisCategories = function() {
	    for (var grade of $scope.newgrades) {
	      grade.category = $scope.categoriesfound[grade.category].mapto;
	    }
	    console.log($scope.newgrades);
  	};
});

$(document).ready(function () {
	$('#categorySelectionDropdown').dropdown();
	$('.averageDropdown').dropdown();

	$('#addGradeButton').click(function () {
		$('#addGradeModal').modal('show');
	});
	$('#enterGradesNextButton').click(function () {
		$('#mapGenesisCategoriesModal').modal('show');
	});
	$('#mapCategoriesNextButton').click(function () {
		$('#addGradeModal').modal('show');
	});
	$('#editClassButton').click(function () {
		$('#editModal').modal('show');
	});
	$('#deleteClassButton').click(function () {
		$('#deleteClassModal').modal('show');
	});
	$('#importFromGenesisButton').click(function () {
		$('#importFromGenesisModal').modal('show');
	});
	$('#enterGradesForImportButton').click(function () {
		$('#enterGradesForImportModal').modal('show');
	});
});

function getTips(category, subject, priority) {
	var tips = {
		general: [],
		specific: [],
		links: []
	};

	// Links: Khan Academy, PrepScholar, Crash Course
	if (priority === 1) switch (subject) {
		case "Mathematics":
			tips.links.push(
				{name: "Khan Academy - Math", link: "https://www.khanacademy.org/math"},
				{name: "IXL", link: "https://www.ixl.com/"},
				{name: "Wolfram Alpha", link: "https://www.wolframalpha.com/"},
				{name: "Kuta Software", link: "https://www.kutasoftware.com/freeia2.html"},
				{name: "JPS Math Dept", link: "https://www.edison.k12.nj.us/domain/348"}
			); break;
		case "English":
			tips.links.push(
				{name: "Close Reading Strategies", link: "https://www.weareteachers.com/strategies-for-close-reading/"},
				{name: "Purdue - MLA Guide", link: "https://owl.purdue.edu/owl/research_and_citation/mla_style/mla_formatting_and_style_guide/mla_formatting_and_style_guide.html"},
				{name: "Citation Machine", link: "http://www.citationmachine.net/mla/cite-a-website"},
				{name: "Litcharts", link: "https://www.litcharts.com/"},
				{name: "JPS English Dept", link: "https://www.edison.k12.nj.us/domain/347"}
			); break;
		case "Science":
			tips.links.push(
				{name: "Khan Academy - Science", link: "https://www.khanacademy.org/science"},
				{name: "Crash Course", link: "https://www.youtube.com/user/crashcourse"},
				{name: "Online Science Tutoring (tutor.com)", link: "https://www.tutor.com/subjects/science"},
				{name: "Expii", link: "https://www.expii.com/"},
				{name: "JPS Science Dept", link: "https://www.edison.k12.nj.us/domain/349"}
			); break;
		case "History":
			tips.links.push(
				{name: "Khan Academy - Arts & Humanities", link: "https://www.khanacademy.org/humanities"},
				{name: "Crash Course", link: "https://www.youtube.com/user/crashcourse"},
				{name: "History Help (chegg.com)", link: "https://www.chegg.com/homework-help/history"},
				{name: "Britannica - History", link: "https://www.britannica.com/topic-browse/History"},
				{name: "JPS Social Studies Dept", link: "https://www.edison.k12.nj.us/domain/350"}
			); break;
		case "World Language":
			tips.links.push(
				{name: "Duolingo", link: "https://www.duolingo.com/"},
				{name: "Word Reference", link: "http://www.wordreference.com/"},
				{name: "Quizlet", link: "https://quizlet.com/"},
				{name: "Rosetta Stone", link: "https://www.rosettastone.com/"},
				{name: "JPS World Languages Dept", link: "https://www.edison.k12.nj.us/domain/351"}
			); break;
	}

	switch (category) {
		case "Tests":
		case "Quizzes":
		case "Assessments":
			// mc strategies
			// test taking strategies
			break;
		case "HW":
		case "CW":
		case "CW & HW":
		case "Classwork & Homework":
		case "Classwork":
		case "Homework":
			// study schedule
			// time management
			break;
		case "Projects":
		case "Major Assessments":
			// time management
			// mla citation
			// Slides, Emaze, Powtoon, Animoto, Wevideo, Prezi
			break;
		case "Programs":
			// Eclipse, repl.it
			// C++ Documentation
			// Java Documentation
			break;
		case "Quarterly":
			break;
		default:

	}

	// general tips
	switch (category) {
		case "Tests":
		case "Quizzes":
		case "Tests & Quizzes":
		case "Interpersonals":
		case "Interpretives":
		case "Presentationals":
		case "Major Assignments":
		case "Projects":
			tips.general.push(
				"If you have an assessment coming soon, spend time studying for it on Mondays & Fridays, when your workload is lower, and avoid studying for a lot of assessments on Tuesdays & Wednesdays, which tend to be the busiest days of the week.",
				"Create a calendar for yourself and set 4-5 days of the week where you will dedicate 10-15 min studying & reviewing for this particular course.",
				"If you have to guess on multiple choice, choose the same answer to bubble for all of the unanswered questions to maximize your score."
			); break;
		case "HW":
		case "CW":
		case "CW & HW":
		case "Classwork & Homework":
		case "Classwork":
		case "Homework":
			tips.general.push(
				"Minimize distractions when completing your work, and do your work at the same time everyday to form a habit.",
				"Create a to-do list/planner everyday or use an app like Reminders or Calendar to track all your assignments & assessments."
			); break;
		case "Quarterly Exam":
		case "Quarterly":
		case "Quarterlies":
			tips.general.push(
				"Make a graphic organizer or study guide ON YOUR OWN that is a conglomeration of all the topics of the MP, so it will be much easier to study for the quarterly.",
				"Avoid solely studying based on shared quarterly documents, because it does not reinforce knowledge & improves your quarterly score very little."
			); break;
	}

	// specific tips
	switch (subject) {
		case "Mathematics":
			switch (category) {
				case "HW":
				case "CW":
				case "CW & HW":
				case "Classwork & Homework":
				case "Classwork":
				case "Homework":
					tips.specific.push(
						"Create an organized HW & CW binder, since you most likely have Math HW/CW almost everyday.",
						"Keep your work organized, show all steps, & star questions that you found difficult, could not answer, or took very long to solve.",
						"Time how long it took to complete your HW so you can see if a particular topic slows you down, in preparation for an assessment."
					); break;
				case "Quizzes":
					tips.specific.push(
						"Before taking your assessment, configure your calculator in the correct mode and familiarize yourself with it to save time during the assessment.",
						"As soon as you get your assessment, write down all the relevant formulas and theorems If you feel you might forget them.",
						"Always save about 5 minutes for the end of the assessment to check over all the questions by using your calculator."
					); break;
				case "Tests":
				case "Assessments":
					tips.specific.push(
						"Try to use your calculator to solve tedious calculations and complicated equations by storing numbers in variables.",
						"Finish the easiest problems first and then tackle the hard problems to accumulate a majority of the points at the start of the assessment.",
						"Organize your work neatly on the assessment to maximize your chances of receiving partial credit."
					); break;
				case "Quarterly Exam":
				case "Quarterly":
				case "Quarterlies":
					tips.specific.push(
						"Create a review guide with all of the formulas, theorems, and topics of the MP, and look back at all the starred problems on your HW from the past MP.",
						"Find more practice online for the topics you find you are weak at, using the links below."
					); break;
			}
			break;
		case "Science":
			switch (category) {
				case "Labs":
					tips.specific.push(
						"Before the lab day, read through the procedures & directions, potentially watching a video of the procedure also, to be prepared.",
						"Create a clean and organized table for data and observations, so when you are in the haste of the lab, you don't confuse yourself.",
						"If allowed, take pictures & videos of your experiment for later reference, when you have to answer questions or write a lab report."
					); break;
				case "Quizzes":
					tips.specific.push(
						"Always create a Quizlet or flashcards for vocab and formulas, since science is a vocab-intensive & formula-intensive subject.",
						"For processes, reactions, etc., make a graphic organizer that highlights the order of the events and the steps for each.",
						"Write textbook notes throughout the course of the chapter, highlighting key concepts & terms, and underlining confusing parts."
					); break;
				case "Tests":
				case "Assessments":
					tips.specific.push(
						"Have your calculator configured before the assessment to the correct mode (degrees or radians)!",
						"If one word in an answer choice is wrong, then the whole answer choice is wrong.",
						"Look over all the worksheets for the whole chapter to review, and ask the teacher a few days before the test about confusing concepts."
					); break;
				case "Quarterly Exam":
				case "Quarterly":
				case "Quarterlies":
					tips.specific.push(
						"Near the end of the MP, go through all of your notes and worksheets and add all starred items to a document. These are your identified weak concepts and the ones you need to work the most on."
					); break;
			}
			break;
		case "History":
			switch (category) {
				case "HW":
				case "CW":
				case "CW & HW":
				case "Classwork & Homework":
				case "Classwork":
				case "Homework":
					tips.specific.push(
						"Try to use historical reasoning skills in your homework (continuity & changes over time, comparison & contrast, cause & effect, etc.) to practice for assessments.",
						"Finish your history HW over multiple days, because it usually involves incorporating a lot of information."
					); break;
				case "Quizzes":
					tips.specific.push(
						"Create a Quizlet or flashcards of the key people, terms, and events in the chapter(s).",
						"Spread out the reading of the textbook over multiple days. For example, read 4-5 pages a night; this helps to increase information retention and make it much less stressful to prepare for the assessment.",
						"You can often get more insight on a difficult question by answering other questions first, since all the questions cover the same chapter(s)."
					); break;
				case "Tests":
				case "Assessments":
					tips.specific.push(
						"Before the assessment, create or find a timeline of the major events of the time period and understand the connections between them.",
						"Try to watch a review video on Crash Course, Khan Academy, or some other source to review information for the assessment.",
						"Eliminate extreme phrases and words, such as answer choices with “always” and “never”, if you are ever unsure of the answer."
					); break;
				case "Projects":
					tips.specific.push(
						"Start planning for the project as early as you can and allocate work, making sure your group members complete their work.",
						"Read the directions carefully to see if all the requirements of the project are met, since many people lose points in this way.",
						"Maintain eye contact with the audience, rehearse what you will say, and bring index cards or references if necessary and allowed."
					); break;
				case "Quarterly Exam":
				case "Quarterly":
				case "Quarterlies":
					tips.specific.push(
						"Start pre-writing your prompts as soon as you get them, because giving yourself multiple days to do this will allow you to incorporate more information & new ideas.",
						"When you plan each prompt, outline the thesis, evidence, and lines of reasoning. Don't copy off of other people because you won't remember the ideas as well as you would doing them by yourself.",
						"Time yourself during the writing of the quarterly and cut body paragraphs short if you feel like you might miss other paragraphs."
					); break;
			}
			break;
		case "English":
			switch (category) {
				case "HW":
				case "CW":
				case "CW & HW":
				case "Classwork & Homework":
				case "Classwork":
				case "Homework":
					tips.specific.push(
						"Try to maintain a style/tone that pertains to the assignment: use formal & elevated language in most cases.",
						"If you are reading a novel, read a set amount of pages each day to prevent cramming hundreds of pages before an assessment. For example, spend 15 mins on all days except Tuesday and Wednesday reading your book."
					); break;
				case "Quizzes":
					tips.specific.push(
						"If you are stuck between a few answer choices, eliminate answers with extreme words & phrases.",
						"If you have an assessment on a novel, read summaries, look at your annotations, and look at you worksheets when reviewing the day before.",
						"Create a Quizlet for all your vocab words, synonyms, & antonyms, and use this in conjunction with your completed vocab activities to study for a vocab quiz."
					); break;
				case "Tests":
				case "Assessments":
				case "Major Assignments":
					tips.specific.push(
						"Use process of elimination to quickly eliminate answers you know are wrong and increase your chances of selecting the correct answer.",
						"Before you write an essay, outline all the points of the essay, the thesis, the topic, etc. to consolidate your knowledge."
					); break;
				case "Quarterly Exam":
				case "Quarterly":
				case "Quarterlies":
					tips.specific.push(
						"For multiple choice questions, ALWAYS look back at the text, because the questions are designed to trick you into choosing a trap answer.",
						"Try to get as many questions correct as early as possible by solving the easier questions first!"
					); break;
			}
			break;
		case "World Language":
			switch (category) {
				case "HW":
				case "CW":
				case "CW & HW":
				case "Classwork & Homework":
				case "Classwork":
				case "Homework":
					tips.specific.push(
						"If you need help with your homework, look back at your vocabulary sheets, worksheets, etc. Don't translate because HW is good for practice.",
						"When studying words, tenses, & endings, organize your worksheets and create a running list of all the new vocab you encounter."
					); break;
				case "Presentationals":
					tips.specific.push(
						"For essays, remember the translations for words that are very common to make your essay as coherent as possible: e.g. prepositions, articles, common phrases, etc.",
						"Create a Quizlet or use flashcards if you have a quiz on vocabulary; know the gender of the words and the part of speech.",
						"For presentationals, use accents when appropriate, describe the ideas in detail, use visuals, and rehearse for it before you present."
					); break;
				case "Interpersonals":
					tips.specific.push(
						"For interpersonals, avoid speaking in English, if you don’t know how to say a word/phrase. Instead, describe the idea you are trying to portray, so the listener understands what you are talking about.",
						"Before you write an essay, outline all the points of the essay, the thesis, the topic, etc. to consolidate your knowledge.",
						"For interpersonals and presentationals, learn to develop your accent by knowing which syllables to pronounce and which to not, how to connect words, and speaking at a correct pace."
					); break;
				case "Interpretives":
					tips.specific.push(
						"For interpretives, try to figure out what the passage is talking about from visuals, cognates & other words you already know, and titles & headings.",
						"For interpretives, try to figure out the meanings of unknown words by looking at the root of the word, what they may mean in English, & use this in the context of the passage to figure out the word’s meaning."
					); break;
				case "Participation":
					tips.specific.push(
						"Try to participate 2-3 times for each class period; try restating the question or statement to develop your speech in the language."
					); break;
			}
			break;
	}

	tips.general.sort(function(a, b){return 0.5 - Math.random()});
	tips.specific.sort(function(a, b){return 0.5 - Math.random()});
	tips.links.sort(function(a, b){return 0.5 - Math.random()});

	return tips;
}
