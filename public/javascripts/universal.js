$(document).ready(function () {
	$('#settingsDropdown').dropdown();

	var last = new Date(window.localStorage.getItem("lastexported")).getTime();
	var now = new Date().getTime();
	var difference = now - last;
	var days = difference / (86400000);
	console.log("Difference in milliseconds: " + days);

	// Check when data was last exported
	if (days > 4) {
		$("#exportDataReminder").show();
		$("#exportDataReminder").popup({
			position: 'top center',
			title: "Export your data!",
			content: "It's been a while since you last exported your data. If your browser's search history gets cleared, you could lose your data!"
		});
	}
	// Current Grade Modal
	$('#currentGradeDropdown').dropdown();
	if (window.localStorage.getItem('currentgrade')) $('#currentGradeDropdown').dropdown('set selected', window.localStorage.getItem('currentgrade'));
	$('#currentGradeModal').modal({
		onApprove: function() {
			window.localStorage.setItem('currentgrade', $('#currentGradeDropdown').dropdown('get value'));
			location.reload();
		}
	});
	$('#currentGradeLink').click(function() {
		$('#currentGradeModal').modal('show');
	});
	// Current MP Modal
	$('#currentMPDropdown').dropdown();
	if (window.localStorage.getItem('currentmp')) $('#currentMPDropdown').dropdown('set selected', window.localStorage.getItem('currentmp'));
	$('#currentMPModal').modal({
		onApprove: function() {
			window.localStorage.setItem('currentmp', $('#currentMPDropdown').dropdown('get value'));
			location.reload();
		}
	});
	$('#currentMPLink').click(function() {
		$('#currentMPModal').modal('show');
	});
	$('#exportLink').click(function() {
		$('#exportModal').modal('show');
	});
	$('#downloadDataButton').click(function() {
		window.localStorage.setItem("lastexported", new Date());
		var data = {};
		for (var i = 0; i <= localStorage.length - 1; i++) {
			data[window.localStorage.key(i)] = window.localStorage.getItem(window.localStorage.key(i));
		}
		var date = new Date();
		var monthNames = [
			"January", "February", "March",
			"April", "May", "June", "July",
			"August", "September", "October",
			"November", "December"
		];
		var element = document.createElement('a');
		element.style.display = 'none';
		element.setAttribute('href', 'data:text/plain;charset=utf-8,' + JSON.stringify(data));
		element.setAttribute('download', 'NextEniac Data - ' + date.getDate() + ' ' + monthNames[date.getMonth()] + ' ' + date.getFullYear() + '.json');
		document.body.appendChild(element);
		element.click();
		document.body.removeChild(element);
	});
	$('#clearModal').modal({
		onApprove: function() {
			window.localStorage.clear();
			window.location.href = '/home';
		}
	});
	$('#clearLink').click(function() {
		$('#clearModal').modal('show');
	});
	/*$('#importModal').modal({
		onApprove: function() {
			var data = JSON.parse(window.atob($('#importText').val()));
			window.localStorage.clear();
			for (var key in data) {
				if (data.hasOwnProperty(key)) window.localStorage.setItem(key, data[key]);
			}
			window.location.href = '/classes';
		}
	});*/
	$('#importLink').click(function() {
		$('#importModal').modal('show');
	});
	$('#selectFileButton').click(function() {
		$('#importDataFile').click();
	});
	$('#importDataFile').change(function() {
		$('#selectFileText').val(document.getElementById('importDataFile').files[0].name);
	});
	$('#importDataButton').click(function() {
		var reader = new FileReader();
		reader.readAsText(document.getElementById('importDataFile').files[0], "UTF-8");
		reader.onload = function (evt) {
			var data = JSON.parse(evt.target.result);
			window.localStorage.clear();
			for (var key in data) {
				if (data.hasOwnProperty(key)) window.localStorage.setItem(key, data[key]);
			}
			window.location.href = '/classes';
		}
		reader.onerror = function (evt) {
	        alert('Error reading file!');
	    }
	});
	$('#gpaSettingsLink').click(function() {
		$('#gpaSettingsModal').modal('show');
	});
	$('#updateSettingsButton').click(function() {
		for (var g = 9; g <= 12; g++) {
			window.localStorage.setItem("gpasettings-" + g, $("#gpasettings-" + g).checkbox('is checked'));
		}
		window.location.href = "/classes";
	});
	for (var g = 9; g <= 12; g++) {
		if (window.localStorage.getItem("gpasettings-" + g) == "true") $("#gpasettings-" + g).checkbox("set checked");
	}

	for (var c = 1; c <= parseInt(window.localStorage.getItem("classcount")); c++) {
		var _class = JSON.parse(window.localStorage.getItem("c" + c));
		if (parseInt(_class.grade) !== parseInt(window.localStorage.getItem("currentgrade"))) continue;
		var elem = '<a href="/classes/' + encodeURIComponent(_class.name) + '" class="item"><i class="book icon"></i>' + _class.name + '</a>';
		$('#classesDropdown .menu').append(elem);
	}
	$('#classesDropdown').dropdown();
});