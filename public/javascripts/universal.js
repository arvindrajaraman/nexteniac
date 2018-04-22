$(document).ready(function () {
	$('#settingsDropdown').dropdown();
	// Current Grade Modal
	$('#currentGradeDropdown').dropdown();
	if (window.localStorage.getItem('currentgrade')) $('#currentGradeDropdown').dropdown('set selected', window.localStorage.getItem('currentgrade'));
	$('#currentGradeModal').modal({
		onApprove: function() {
			window.localStorage.setItem('currentgrade', $('#currentGradeDropdown').dropdown('get value'));
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
		}
	});
	$('#currentMPLink').click(function() {
		$('#currentMPModal').modal('show');
	});
	$('#exportLink').click(function() {
		$('#exportModal').modal('show');
	});
	$('#downloadDataButton').click(function() {
		var data = {};
		for (var i = 0; i <= localStorage.length - 1; i++) {
			data[window.localStorage.key(i)] = window.localStorage.getItem(window.localStorage.key(i));
		}
		var date = new Date();
		var element = document.createElement('a');
		element.style.display = 'none';
		element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(window.btoa(JSON.stringify(data))));
		element.setAttribute('download', 'literatedata.ldcf');
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
			var data = JSON.parse(window.atob(evt.target.result));
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
});