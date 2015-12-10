var game = require('./lib/game')

window.onload = function() {
	resetConfig(function() {
		game()
	})
}

function resetConfig(callback) {
	window.config = {
		objs: [],
		count: 0,
		speed: {
			nb: 2,
			add: 3000
		},
		score: {
			points: 0,
			life: 5,
			boom: false
		}
	}
	callback()
}
