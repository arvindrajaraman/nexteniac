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
		var data = {};
		for (var i = 0; i <= localStorage.length - 1; i++) {
			data[window.localStorage.key(i)] = window.localStorage.getItem(window.localStorage.key(i));
		}
		$('#exportText').val(window.btoa(JSON.stringify(data)));
		$('#exportModal').modal('show');
	});
	$('#exportText').on('click', function () {
		$(this).select();
	});
	$('#clearModal').modal({
		onApprove: function() {
			window.localStorage.clear();
		}
	});
	$('#clearLink').click(function() {
		$('#clearModal').modal('show');
	});
	$('#importModal').modal({
		onApprove: function() {
			var data = JSON.parse(window.atob($('#importText').val()));
			window.localStorage.clear();
			for (var key in data) {
				if (data.hasOwnProperty(key)) window.localStorage.setItem(key, data[key]);
			}
			$('#importText').val('');
		}
	});
	$('#importLink').click(function() {
		$('#importModal').modal('show');
	});
});