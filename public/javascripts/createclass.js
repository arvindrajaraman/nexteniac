var app = angular.module('nexteniac-createclass', []);

app.config(function($interpolateProvider) {
	$interpolateProvider.startSymbol('{[');
	$interpolateProvider.endSymbol(']}');
});

app.controller('MainController', function($scope) {
	$scope.finalaverage = 10;
	$scope.existingclasses = [];
	$scope.newclasses = [];

	$scope.addCurrentClass = function() {
		$scope.newclasses.push({isfullfeaturedclass: true,categories:[{}]});
	};
	$scope.addPastClass = function() {
		$scope.newclasses.push({isfullfeaturedclass: false,finalAverage: 10});
	};
	$scope.deleteClass = function(i) {
		$scope.newclasses.splice(i, 1);
	};
	$scope.addCategory = function(i) {
		$scope.newclasses[i].categories.push({});
	};
	$scope.deleteCategory = function(a,b) {
		$scope.newclasses[a].categories.splice(b, 1);
	};
	$scope.setFinalAverage = function(i, avg) {
		$scope.newclasses[i].finalAverage = avg;
	};
	for (var i = 1; i <= parseInt(window.localStorage.getItem("classcount")); i++) {
		$scope.existingclasses.push(JSON.parse(window.localStorage.getItem("c" + i)).name);
	}

	/*$scope.addCategory = function() {
		$scope.categories.push({
			name: '',
			weight: '',
			hascustomname: false
		})
	};*/

	/*$scope.deleteCategory = function(index) {
		$scope.categories.splice(index, 1);
	};*/

	$scope.toggleMP = function(mp) {
		$scope.mpactive[mp-1] = ($scope.mpactive[mp-1]) ? false : true;
	};
	
	$scope.addClasses = function() {
		for (var i = 0; i <= $scope.newclasses.length - 1; i++) {
			$scope.class = $scope.newclasses[i];
			$scope.class.credits = parseFloat($scope.class.credits);
			$scope.class.mp1 = $scope.class.activemps.includes("1");
			$scope.class.mp2 = $scope.class.activemps.includes("2");
			$scope.class.mp3 = $scope.class.activemps.includes("3");
			$scope.class.mp4 = $scope.class.activemps.includes("4");
			delete $scope.class.activemps;
			delete $scope.class.$$hashKey;
			$scope.class.id = new Date().getTime();

			var ls = window.localStorage;
			if (!ls.getItem('classcount')) ls.setItem('classcount', 1);
			else ls.setItem('classcount', parseInt(ls.getItem('classcount')) + 1);
			if ($scope.class.isfullfeaturedclass) {
				$scope.categories = $scope.class.categories;
				delete $scope.class.categories;
				ls.setItem('c' + ls.getItem('classcount'), JSON.stringify($scope.class));
				ls.setItem('c' + ls.getItem('classcount') + '-catcount', $scope.categories.length);
				for (var j = 1; j <= $scope.categories.length; j++) {
					var category = JSON.stringify($scope.categories[j-1]);
					delete category.$$hashKey;
					delete category.hascustomname;
					ls.setItem('c' + ls.getItem('classcount') + '-cat' + j, category);
				}
				ls.setItem('c' + ls.getItem('classcount') + '-assignmentcount', 0);
			}
			else {
				var _class = $scope.class;
				$scope.finalAverage = _class.finalAverage;
				delete _class.finalAverage;
				var averages = [];
				ls.setItem('c' + ls.getItem('classcount'), JSON.stringify(_class));
				for (var j = 1; j <= 4; j++) {
					if ($scope.class['mp' + j]) averages.push($scope.finalAverage);
					else averages.push(null);
				}
				ls.setItem('c' + ls.getItem('classcount') + '-averages', JSON.stringify(averages));
			}
		}
		window.location.href = '/classes';
	};
});