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
});