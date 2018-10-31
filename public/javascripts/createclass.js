var app = angular.module('nexteniac-createclass', []);

app.config(function($interpolateProvider) {
	$interpolateProvider.startSymbol('{[');
	$interpolateProvider.endSymbol(']}');
});

app.controller('MainController', function($scope) {
	$scope.class = {};
	$scope.mpactive = [true, true, true, true];
	$scope.isfullfeaturedclass = true;
	$scope.finalaverage = 10;
	$scope.categories = [{
		name: '',
		weight: '',
		hascustomname: false
	}];
	$scope.existingclasses = [];

	for (var i = 1; i <= parseInt(window.localStorage.getItem("classcount")); i++) {
		$scope.existingclasses.push(JSON.parse(window.localStorage.getItem("c" + i)).name);
	}

	$scope.addCategory = function() {
		$scope.categories.push({
			name: '',
			weight: '',
			hascustomname: false
		})
	};

	$scope.deleteCategory = function(index) {
		$scope.categories.splice(index, 1);
	};

	$scope.toggleMP = function(mp) {
		$scope.mpactive[mp-1] = ($scope.mpactive[mp-1]) ? false : true;
	};

	$scope.checkCustomChange = function(i) {
		if ($scope.categories[i].name == "0") {
			$scope.categories[i].name = "";
			$scope.categories[i].hascustomname = true;
		}
	};
	
	$scope.createClass = function() {
		var valid = true;
		var fields = ["name", "credits", "type", "priority", "difficulty", "grade", "goalaverage", "subject"];
		if (!$scope.isfullfeaturedclass) fields = ["name", "credits", "type", "grade", "subject"];
		for (var f = 0; f <= fields.length - 1; f++) {
			var value = $scope.class[fields[f]];
			if (value !== undefined && value !== "") {
				document.getElementById('CCF' + fields[f]).classList.remove('error');
			}
			else {
				valid = false;
				document.getElementById('CCF' + fields[f]).classList.add('error');
			}
			// Checks if class name has already been used
			if (fields[f] === "name") {
				for (var i = 0; i <= $scope.existingclasses.length - 1; i++) {
					if ($scope.existingclasses[i] === value) {
						valid = false;
						document.getElementById('CCF' + fields[f]).classList.add('error');
					}
				}
			}
		}
		if ($scope.isfullfeaturedclass) {
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
		}
		if (valid) {
			$scope.class.mp1 = $scope.mpactive[0];
			$scope.class.mp2 = $scope.mpactive[1];
			$scope.class.mp3 = $scope.mpactive[2];
			$scope.class.mp4 = $scope.mpactive[3];
			$scope.class.id = new Date().getTime();
			$scope.class.isfullfeaturedclass = $scope.isfullfeaturedclass;

			var ls = window.localStorage;
			if (!ls.getItem('classcount')) ls.setItem('classcount', 1);
			else ls.setItem('classcount', parseInt(ls.getItem('classcount')) + 1);
			if ($scope.isfullfeaturedclass) {
				ls.setItem('c' + ls.getItem('classcount'), JSON.stringify($scope.class));
				ls.setItem('c' + ls.getItem('classcount') + '-catcount', $scope.categories.length);
				for (var i = 1; i <= $scope.categories.length; i++) {
					var category = JSON.stringify($scope.categories[i-1]);
					delete category.$$hashKey;
					delete category.hascustomname;
					ls.setItem('c' + ls.getItem('classcount') + '-cat' + i, category);
				}
				ls.setItem('c' + ls.getItem('classcount') + '-assignmentcount', 0);
			}
			else {
				var _class = $scope.class;
				var averages = [];
				delete _class.difficulty;
				delete _class.goalaverage;
				delete _class.priority;
				ls.setItem('c' + ls.getItem('classcount'), JSON.stringify(_class));
				for (var i = 1; i <= 4; i++) {
					if ($scope.class['mp' + i]) averages.push($scope.finalaverage);
					else averages.push(null);
				}
				ls.setItem('c' + ls.getItem('classcount') + '-averages', JSON.stringify(averages));
			}
			window.location.href = '/classes/' + $scope.class.name;
		}
	};
});

$(document).ready(function() {
	$('.dropdown').dropdown();
});