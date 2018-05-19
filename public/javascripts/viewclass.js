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
	// Presets
	$scope.tab = 1;
	$scope.changesTab = 3;
	$scope.goalTab = 1;
	$scope.toolTab = 1;
	$scope.distributionTab = 1;
	$scope.newgrades = [{}];
	$scope.search = {
		mp: 2
	};
	$scope.sort = {
		dir: 1, // 1 = ascemdimg, -1 = descending
		field: 1, // 1 = date, 2 = letter, ..., 6 = assignment name
	};
	$scope.expavgs = { mp1: "10", mp2: "10", mp3: "10", mp4: "10", final: "10" };
	$scope.initializedAverageProgressionChart = false;
	$scope.initializedUndecilesChart = false;
	$scope.initializedFrequencyChart = false;
	$scope.advancedmode = false;

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
		for (var g = 1; g <= parseInt(LS.getItem("c" + $scope.classlsid + "-assignmentcount")); g++) {
			var grade = LS.getGrade($scope.classlsid, g);
			delete grade.$$hashKey;
			grade.percent = grade.ptsearned * 100 / grade.ptstotal;
			grade.letter = GradeFactory.percentToLetter(grade.percent);
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
		$scope.frequencies = [[], [], [], []];
		var grades = ["F", "D", "C+", "C", "C-", "B-", "B", "B+", "A-", "A", "A+"];
		for (var mp = 1; mp <= 4; mp++) {
			for (var c = 0; c <= 10; c++) {
				$scope.frequencies[mp-1].push({
					classgrade: grades[c],
					frequency: 0,
					relativefrequency: 0,
					inversefrequency: 0,
					inverserelativefrequency: 0,
					cumulativefrequency: 0,
					cumulativerelativefrequency: 0,
					inversecumulativefrequency: 0,
					inversecumulativerelativefrequency: 0
				});
			}
		}
		for (var g = 1; g <= $scope.grades.length; g++) {
			var grade = $scope.grades[g-1];
			var percentIndex = GradeFactory.letterToNumEquiv(GradeFactory.percentToLetter(grade.ptsearned * 100 / grade.ptstotal));
			$scope.frequencies[grade.mp-1][percentIndex].frequency++;
		}
		for (var mp = 1; mp <= 4; mp++) {
			for (var c = 0; c <= 10; c++) {
				$scope.frequencies[mp-1][c].inversefrequency = $scope.mpGrades[mp-1].length - $scope.frequencies[mp-1][c].frequency;
				$scope.frequencies[mp-1][c].relativefrequency = Math.round(($scope.frequencies[mp-1][c].frequency * 100 / $scope.mpGrades[mp-1].length) * 100) / 10000;
				$scope.frequencies[mp-1][c].inverserelativefrequency = 1 - $scope.frequencies[mp-1][c].relativefrequency;
				if (c === 0) {
					$scope.frequencies[mp-1][c].cumulativefrequency = $scope.frequencies[mp-1][c].frequency;
					$scope.frequencies[mp-1][10-c].inversecumulativefrequency = $scope.frequencies[mp-1][10-c].frequency;
				}
				else {
					$scope.frequencies[mp-1][c].cumulativefrequency = $scope.frequencies[mp-1][c-1].cumulativefrequency + $scope.frequencies[mp-1][c].frequency;
					$scope.frequencies[mp-1][10-c].inversecumulativefrequency = $scope.frequencies[mp-1][11-c].inversecumulativefrequency + $scope.frequencies[mp-1][10-c].frequency;
				}
			}
			for (var c = 0; c <= 10; c++) {
				$scope.frequencies[mp-1][c].cumulativerelativefrequency = Math.round(($scope.frequencies[mp-1][c].cumulativefrequency * 100 / $scope.mpGrades[mp-1].length) * 100) / 10000;
				$scope.frequencies[mp-1][c].inversecumulativerelativefrequency = Math.round(($scope.frequencies[mp-1][c].inversecumulativefrequency * 100 / $scope.mpGrades[mp-1].length) * 100) / 10000;
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
		$scope.graphPoints = [[], [], [], []];
		$scope.graphDates = [[], [], [], []];
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
	
	$scope.initViewClass = function() {
		initClass();
		initCategoriesAndGradeBrackets();
		initGrades();
		initFrequencies();
		initBracketBasedStatsAndAverages();
		initAverageProgression();
		initInsights();
		//console.log($scope);
	};
	
	// Events
	$scope.$watch('search.mp', function() {
		$scope.reinitAverageProgressionChart();
		$scope.reinitFrequencyChart();
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

	var frequencyChart;
	$scope.reinitFrequencyChart = function() {
		var data = [];
		var field, label;
		switch ($scope.distributionTab) {
			case 1:
				field = 'frequency';
				label = 'Frequency';
				break;
			case 7:
				field = 'inversefrequency';
				label = 'Inverse Frequency';
				break;
			case 3:
				field = 'cumulativefrequency';
				label = 'Cumulative Frequency';
				break;
			case 6:
				field = 'inversecumulativefrequency';
				label = 'Inverse Cumulative Frequency';
				break;
		}
		for (var _class of $scope.frequencies[$scope.search.mp-1]) {
			data.push(_class[field]);
		}

		if ($scope.initializedFrequencyChart) {
			frequencyChart.data.datasets[0].data = data.slice(0);
			frequencyChart.data.datasets[0].label = label;
			frequencyChart.options.title.text = 'Grade ' + label;
			frequencyChart.update();
		}
		else {		
			frequencyChart = new Chart("frequencyChart", {
				type: 'bar',
				data: {
					labels: ["F", "D", "C+", "C", "C-", "B-", "B", "B+", "A-", "A", "A+"],
					datasets: [{
						data: data,
						label: label,
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
						text: 'Grade ' + label
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
			$scope.initializedFrequencyChart = true;
		}
	};

	$scope.toggleAdvancedMode = function() {
		$scope.advancedmode = !$scope.advancedmode;
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
		$scope.tab = t;
	};

	$scope.changeChangesTab = function(t) {
		$scope.changesTab = t;
	};

	$scope.changeGoalTab = function(t) {
		$scope.goalTab = t;
	};

	$scope.changeToolTab = function(t) {
		$scope.toolTab = t;
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

	$scope.deleteNewGrade = function(index) {
		$scope.newgrades.splice(index, 1);
	};
});

$(document).ready(function () {
	$('#mpSelectionDropdown').dropdown();
	$('#categorySelectionDropdown').dropdown();
	$('.averageDropdown').dropdown();

	if (window.localStorage.getItem('currentmp')) $('#mpSelectionDropdown').dropdown('set selected', window.localStorage.getItem('currentmp'));
	else $('#mpSelectionDropdown').dropdown('set selected', '1');

	$('#addGradeButton').click(function () {
		$('#addGradeModal').modal('show');
	});
	$('#categoryStatsGrid .info.icon').popup();
});