angular.module('draymasterApp')
.filter('timeRemaining', function() {
	return function(input) {
		var minutes = input;
    if(minutes <= 1) {
			return '1 Minute';
		} else if(minutes > 1 && minutes <= 60) {
			return minutes + ' Minutes';
		} else {
			var hours = Math.floor(minutes/60);
			var updatedMinutes = minutes - (hours*60);
			if(hours === 1 && updatedMinutes > 1) {
				return hours + ' Hour ' + updatedMinutes + ' Minutes';
			} else if(hours ===1 && updatedMinutes <= 1) {
				return hours + ' Hour ' + updatedMinutes + ' Minute';
			} else if(hours > 1 && updatedMinutes > 1) {
				return hours + ' Hours ' + updatedMinutes + ' Minutes';
			} else {
				return hours + ' Hours ' + updatedMinutes + ' Minute';
			}
		}
	};
});