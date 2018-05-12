var app = angular.module('literate-createclass', []);

app.config(function($interpolateProvider) {
	$interpolateProvider.startSymbol('{[');
	$interpolateProvider.endSymbol(']}');
});

app.controller('MainController', function($scope) {
	$scope.class = {};
	$scope.mpactive = [true, true, true, true];
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
		var valid = true;
		var fields = ["name", "credits", "type", "priority", "difficulty", "grade", "goalaverage"];
		for (var f = 0; f <= fields.length - 1; f++) {
			var value = $scope.class[fields[f]];
			if (value !== undefined && value !== "") {
				document.getElementById('CCF' + fields[f]).classList.remove('error');
			}
			else {
				valid = false;
				document.getElementById('CCF' + fields[f]).classList.add('error');
			}
		}
		var catfields = ["name", "weight"];
		for (var c = 0; c <= $scope.categories.length - 1; c++) {
			for (var f = 0; f <= catfields.length - 1; f++) {
				var value = $scope.categories[c][catfields[f]];
				if (value !== undefined && value !== "") {
					document.getElementById('CCFcategory' + catfields[f] + c).classList.remove('error');
				}
				else {
					valid = false;
					document.getElementById('CCFcategory' + catfields[f] + c).classList.add('error');
				}
			}
		}
		valid = false;
		if (valid) {
			$scope.class.mp1 = $scope.mpactive[0];
			$scope.class.mp2 = $scope.mpactive[1];
			$scope.class.mp3 = $scope.mpactive[2];
			$scope.class.mp4 = $scope.mpactive[3];
			$scope.class.id = new Date().getTime();

			var ls = window.localStorage;
			if (!ls.getItem('classcount')) ls.setItem('classcount', 1);
			else ls.setItem('classcount', parseInt(ls.getItem('classcount')) + 1);
			ls.setItem('c' + ls.getItem('classcount'), JSON.stringify($scope.class));
			ls.setItem('c' + ls.getItem('classcount') + '-catcount', $scope.categories.length);
			for (var i = 1; i <= $scope.categories.length; i++) {
				var category = JSON.stringify($scope.categories[i-1]);
				delete category.$$hashKey;
				ls.setItem('c' + ls.getItem('classcount') + '-cat' + i, category);
			}
			ls.setItem('c' + ls.getItem('classcount') + '-assignmentcount', 0);
			window.location.href = '/classes/' + $scope.class.name;
		}
	};
});

$(document).ready(function() {
	$('.dropdown').dropdown();
	if (window.localStorage.getItem('currentgrade')) $('#gradeDropdown').dropdown('set selected', window.localStorage.getItem('currentgrade'));
});