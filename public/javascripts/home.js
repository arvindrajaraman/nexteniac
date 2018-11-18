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
}

var app = angular.module('nexteniac-home', []);

app.config(function($interpolateProvider) {
	$interpolateProvider.startSymbol('{[');
	$interpolateProvider.endSymbol(']}');
});

app.controller('MainController', function ($scope) {
	$scope.graphstab = 1;

	$scope.changeGraphsTab = function(t) {
		$scope.graphstab = t;
	};

	$scope.averageDates = [];
	$scope.averagePoints = [];
	var currdate = new Date();
	var totalearned = 0, totalpts = 0;
	for (var i = 0; i <= 10; i++) {
		currdate.setDate(currdate.getDate() + 2);
		totalpts += 100;
		totalearned += Math.floor(Math.random() * 20) + 80;
		$scope.averageDates.push(new Date(currdate));
		$scope.averagePoints.push({
			x: new Date(currdate),
			y: Math.floor(totalearned * 1000 / totalpts) / 10
		});
	}

	var averageChart = new Chart("averageChart", {
	    type: 'line',
	    data: {
	    	labels: $scope.averageDates,
	    	datasets: [{
	    		data: $scope.averagePoints,
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

	//$scope.frequencyCategories = ["F", "D", "C-", "C", "C+", "B-", "B", "B+", "A-", "A", "A+"];
	$scope.frequencyPoints = [];
	for (var i = 0; i <= 10; i++) {
		$scope.frequencyPoints.push(Math.ceil(Math.random() * 20));
	}

	var frequencyChart = new Chart("frequencyChart", {
		type: 'bar',
		data: {
			labels: ["F", "D", "C-", "C", "C+", "B-", "B", "B+", "A-", "A", "A+"],
			datasets: [{
				data: $scope.frequencyPoints,
				label: "Frequency",
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
				text: 'Grade Frequency'
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

	setInterval(function () {
		if ($scope.graphstab === 1) {
			var currdate = new Date();
			var totalearned = 0, totalpts = 0;
			$scope.averageDates = [];
			$scope.averagePoints = [];
			for (var i = 0; i <= 10; i++) {
				currdate.setDate(currdate.getDate() + 2);
				totalpts += 100;
				totalearned += Math.floor(Math.random() * 20) + 80;
				$scope.averageDates.push(new Date(currdate));
				$scope.averagePoints.push({
					x: new Date(currdate),
					y: Math.floor(totalearned * 1000 / totalpts) / 10
				});
			}
			averageChart.data.datasets[0].data = $scope.averagePoints;
			averageChart.data.labels = $scope.averageDates;
			averageChart.update();
		}
		else if ($scope.graphstab === 2) {
			$scope.frequencyPoints = [];
			for (var i = 0; i <= 10; i++) {
				$scope.frequencyPoints.push(Math.ceil(Math.random() * 20));
			}
			frequencyChart.data.datasets[0].data = $scope.frequencyPoints;
			frequencyChart.update();
		}
	}, 3000);
});

$(document).ready(function () {
	
});