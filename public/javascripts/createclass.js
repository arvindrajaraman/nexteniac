var app = angular.module('literate-createclass', []);

app.config(function($interpolateProvider) {
	$interpolateProvider.startSymbol('{[');
	$interpolateProvider.endSymbol(']}');
});

app.controller('MainController', function ($scope) {
	$scope.categories = [{
		name: '',
		weight: ''
	}, {
		name: '',
		weight: ''
	}, {
		name: '',
		weight: ''
	}, {
		name: '',
		weight: ''
	}, {
		name: '',
		weight: ''
	}];

	$scope.deleteCategory = function(index) {
		$scope.categories.splice(index, 1);
	};
});

$(document).ready(function () {
	$('.dropdown').dropdown();
});