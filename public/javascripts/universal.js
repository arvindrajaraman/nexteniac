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
		var data = {
			currentmp: window.localStorage.getItem('currentmp'),
			currentgrade: window.localStorage.getItem('currentgrade'),
			classcount: window.localStorage.getItem('classcount')
		};
		for (var c = 1; c <= parseInt(data.classcount); c++) {
			data['c' + c] = window.localStorage.getItem('c' + c);
			data['c' + c + '-assignmentcount'] = window.localStorage.getItem('c' + c + '-assignmentcount');
			data['c' + c + '-catcount'] = window.localStorage.getItem('c' + c + '-catcount');
			for (var cat = 1; cat <= parseInt(data['c' + c + '-catcount']); cat++) {
				data['c' + c + '-cat' + cat] = window.localStorage.getItem('c' + c + '-cat' + cat);
			}
		}
		$('#exportText').val(window.btoa(JSON.stringify(data)));
		$('#exportModal').modal('show');
	});
	$('#exportText').on('click', function () {
		$(this).select();
	});
});