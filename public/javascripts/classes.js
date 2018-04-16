var app = angular.module('literate-classes', []);

app.config(function($interpolateProvider) {
	$interpolateProvider.startSymbol('{[');
	$interpolateProvider.endSymbol(']}');
});

app.filter('check', function () {
	return function(val){
		return (val) ? 'green check' : 'red x';
	}
});

app.controller('MainController', function ($scope) {
	$scope.unweightedgpa = 3.801;
	$scope.weightedgpa = 5.519;
	$scope.average = 'A';

	$scope.classes = [{
		lettergrade: 'A',
		numbergrade: 95.21,
		name: 'Intro to Business',
		credits: 5,
		type: 'Level 2',
		mp1: true,
		mp2: true,
		mp3: true,
		mp4: true
	}, {
		lettergrade: 'B',
		numbergrade: 87.12,
		name: 'US History-1',
		credits: 5,
		type: 'Level 1',
		mp1: true,
		mp2: true,
		mp3: true,
		mp4: true
	}, {
		lettergrade: 'A-',
		numbergrade: 91.12,
		name: 'AP Environmental Science',
		credits: 5,
		type: 'Honors',
		mp1: true,
		mp2: true,
		mp3: true,
		mp4: true
	}, {
		lettergrade: 'C',
		numbergrade: 74.47,
		name: 'English 9-1',
		credits: 5,
		type: 'Level 1',
		mp1: true,
		mp2: true,
		mp3: true,
		mp4: true
	}, {
		lettergrade: 'B+',
		numbergrade: 85.43,
		name: 'Physical Education',
		credits: 5,
		type: 'Level 2',
		mp1: true,
		mp2: true,
		mp3: false,
		mp4: true
	}];
});

$(document).ready(function () {
	$('.dropdown').dropdown();
});