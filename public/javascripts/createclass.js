var app = angular.module('literate-createclass', []);

app.config(function($interpolateProvider) {
	$interpolateProvider.startSymbol('{[');
	$interpolateProvider.endSymbol(']}');
});

app.controller('MainController', function($scope) {
	$scope.class = {};
	$scope.mpactive = [false, false, false, false];
	$scope.categories = [{
		name: '',
		weight: ''
	}];

	$scope.addCategory = function() {
		$scope.categories.push({
			name: '',
			weight: ''
		})
	};

	$scope.deleteCategory = function(index) {
		$scope.categories.splice(index, 1);
	};

	$scope.toggleMP = function(mp) {
		$scope.mpactive[mp-1] = ($scope.mpactive[mp-1]) ? false : true;
	};

	$scope.createClass = function() {
		$scope.class.mp1 = $scope.mpactive[0];
		$scope.class.mp2 = $scope.mpactive[1];
		$scope.class.mp3 = $scope.mpactive[2];
		$scope.class.mp4 = $scope.mpactive[3];
		$scope.class.id = new Date().getTime();

		var ls = window.localStorage;
		if (!ls.getItem('classcount')) ls.setItem('classcount', 1);
		else ls.setItem('classcount', ls.getItem('classcount') + 1);
		ls.setItem('c' + ls.getItem('classcount'), JSON.stringify($scope.class));
		ls.setItem('c' + ls.getItem('classcount') + '-catcount', $scope.categories.length);
		for (var i = 1; i <= $scope.categories.length; i++) {
			ls.setItem('c' + ls.getItem('classcount') + '-cat' + i, JSON.stringify($scope.categories[i-1]));
		}
		ls.setItem('c' + ls.getItem('classcount') + '-assignmentcount', 0);
		window.location.href = '/classes/' + $scope.class.id;
	};
});

$(document).ready(function() {
	$('.dropdown').dropdown();
	if (window.localStorage.getItem('currentgrade')) $('#gradeDropdown').dropdown('set selected', window.localStorage.getItem('currentgrade'));
});